# Java 多线程总结

## 前言

这是一篇个人关于Java多线程的学习总结，如果存在错误还请见谅并欢迎留言纠正。

## 基础概念

## 基础概念-并发和并行

- 并发：**同一时间段执行多个任务**。
- 并行：**同一时刻执行多个任务**。

## 基础概念-同步和异步

> TODO 待补充

- 同步：**阻塞执行任务, 需要等待任务结束才会进行下一任务的执行。效率低但是安全**。
- 异步：**非阻塞执行任务，不需要等待任务结束就能进行下一任务的执行，任务结果会以其他的方式进行返回。效率高但是数据不安全**。

## 基础概念-线程和进程

- 进程：**一个独立的应用程序，有自己独立的内存空间**。
- 线程：**一个进程中的一条执行路径，多个线程共享内存空间**。

## 基础概念-常见调度方式

- 分时调度：**分配相同的时间片来占用资源并执行任务，不容易造成阻塞**。
- 抢占式调度：**根据任务优先级抢占资源并执行任务，需要主动释放资源，容易造成阻塞**。

## 基础概念-什么是多线程

$\qquad$首先了解多任务概念，在操作系统中，**多任务指在同一时刻运行多个程序的能力**。
而多线程就是在较低层次上扩展了多任务的概念，**多线程指一个程序同时执行多个任务**。

## 基础概念-JAVA线程的六种状态

- New(新创建)
  > 使用new关键字创建新线程。
- Runnable(可运行)
  > 线程对象调用start或者run方法，表示线程进入可运行状态。可运行状态的线程可能在运行中也可能没有运行。Java的规范说明中并没有将其认定为是一个独立的状态。
- Blocked(被阻塞)
  > 一个线程试图获取一个对象的内部锁，但是该锁(非java.util.concurrent库中的锁)正被其他的线程所持有时，当前线程进入阻塞状态。
- Waiting(等待)
  > 一个线程正在等待另一个线程通知调度器一个条件时，该线程进入等待状态。被阻塞和等待状态有很大不同。
- Timed Waiting(计时等待)
  > 有几个携带定时参数的方法可以使线程进入计时等待，直到超时期满或者接收到合适的通知。
- Terminated(终止)
  > 有两种情况
  >
  > - 因为run方法自然退出，导致线程进入终止状态。
  > - 产生未进行捕获的异常导致run方法终止，使线程进入终止状态。

## 基础概念-锁对象

> 有两种机制用于保护代码块免受并发的干扰，分别是显式锁和隐式锁，同时提供java.util.concurrent框架为这些基础机制提供了一些独立的类。

### 显式锁

> 显式锁是一种使用Java SE 5.0引入的ReentrantLock类来保护代码块的机制。

### 隐式锁

> 隐式锁是一种使用Java提供的synchronized关键字来保护代码块的机制。

## 多线程的基本使用

## 多线程的基本使用-显式创建多线程

### Thread类

### 继承Thread类

```java
public class  Task {
    public static void main(String[] args) {
        ThreadDemo threadDemo = new ThreadDemo();
        threadDemo.start();
    }

    static class ThreadDemo extends Thread {
        @Override
        public void run() {
            System.out.println("继承Thread类");
        }
    }
}
```

### 匿名内部类(Thread)

```java
  public class  Task {
      public static void main(String[] args) {
          new Thread() {
              @Override
              public void run() {
                  System.out.println("匿名内部类(Thread)");
              }
          }.start();
      }
  }
```

### Runnable接口

> Runnable封装一个异步运行的任务。

### 实现Runnable接口

```java
public class  Task {
    public static void main(String[] args) {
        new Thread(new RunnableDemo()).start();
    }

    static class RunnableDemo implements  Runnable {
        @Override
        public void run() {
            System.out.println("实现Runnable");
        }
    }
}
```

### 匿名内部类(Runnable)

```java
public class  Task {
    public static void main(String[] args) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("匿名内部类(Runnable)");
            }
        }).start();
    }
}
```

### Callable接口 + Future接口

> 需要使用FutureTask包装器，FutureTask中实现了一种非常便利的机制，可以将Callable转换为Future和Runnable。可以将一个Future对象交给某个线程，然后在Future对象的所有者在结果计算好之后就能获得它。
>
> 所以Callable接口+Future接口的方式和Thread和Runnable实现多线程的方式有区别，当Future对象的所有者试图获取Future对象时，线程会被阻塞。

> 补充：
>
> Runnable封装一个异步运行的任务
>
> Future保存异步计算的结果

```java
public class  Task {
    public static void main(String[] args) {
        CallableDemo callableDemo = new CallableDemo();
        FutureTask<String> futureTask = new FutureTask<String>(callableDemo);
        new Thread(futureTask).start();

        try {
            System.out.println(futureTask.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();

        }
    }

    static class CallableDemo implements Callable<String> {
        @Override
        public String call() throws Exception {
            Thread.sleep(1000);
            return "Callable接口 + Future接口";
        }
    }
}
```

### FutureTask包装器常用方法

| 方法                                 | 描述                                                                                                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| v get()                              | 获取结果，阻塞调用者所在线程直到计算Future的线程结束或者发生中断异常。如果计算Future的线程发生中断，会抛出InterruptedException异常。                 |
| v get(long time, TimeUnit unit)      | 获取结果，阻塞调用者所在线程直到超过指定时间为止。如果超时则抛出TimeoutException异常。如果计算Future的线程发生中断，会抛出InterruptedException异常。 |
| boolean cancel(boolean mayInterrupt) | 尝试取消任务执行，如果任务已经开始的情况下，mayInterrupt为true，该任务会被中断。如果成功执行了取消操作，返回true。                                   |
| boolean isCancel()                   | 如果任务在完成过程前被取消了，则返回true                                                                                                             |
| boolean isDone()                     | 如果任务结束，无论是正常结束、中途取消或者发生异常，都返回true                                                                                       |

## 隐式创建多线程

## 隐式创建多线程-线程池(Thread pool)

> 线程池优点：降低资源消耗，提高响应速度，提高线程可管理性。

> 执行者(Executors)类提供许多静态工厂方法来构建线程池。其中常用的有5种线程池构建方法。
>
> 执行者(Executors)使用一些工厂方法返回的ExecutorService对象或者其子类ScheduledExecutorService对象都实现于ExecutorService接口，而ExecutorService继承于Executor接口。
>
> 执行器(Executor)只表示一个执行任务的对象，而ExecutorService才表示一个线程池。

## 隐式创建多线程-执行者(Executors)创建线程池常用方法

| 方法                             | 描述                                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| newCachedThreadPool              | 缓存线程池；必要时创建新线程；空闲线程会被保留60秒；返回ExecutorService对象                     |
| newFixedThreadPool               | 定长线程池；该池会包含固定数量的线程；空闲线程会被保留；返回ExecutorService对象                 |
| newSingleThreadExecutor          | 单线程池；只有一个线程的“池”，该线程会顺序执行每一个提交的任务；返回ExecutorService对象         |
| newScheduledThreadPool           | 周期定长线程；用于预定执行而构建的线程池，替代java.util.Timer；返回ScheduledExecutorService对象 |
| newSingleThreadScheduledExecutor | 周期定长单线程池；用于预定执行而构建的单线程“池”；返回ScheduledExecutorService对象              |

## 隐式创建多线程-线程池对象及其常用方法介绍

- ExecutorService
  > ExecutorService继承与Executor，也可以使用Executor自建线程池。

<!-- | 方法 | 描述 |
| --- | --- |
| Future\<T\> submit(Callable\<T\> task) | 提交指定任务并执行 |
| Future\<T\> submit(Runnable task, T result) | 提交指定任务并执行 |
| Future<?> submit(Runnable task) | 提交指定任务并执行 |
| void shutdown() | 关闭服务，不再接收新任务，但是会完成已经提交的任务。 |
| void shutdownNow() | 关闭服务，不再接收新任务，并且取消未开始的任务，并试图中断正在进行的任务。 | -->

- ScheduledExecutorService

| 方法                                                                                                    | 描述                                                                                                    |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| ScheduledFuture\<V\> schedule(Callable\<V\> task, long time TimeUnit unit)                              | 预定在指定的时间之后执行任务                                                                            |
| ScheduledFuture\<?\> schedule(Runnable task, long time TimeUnit unit)                                   | 预定在指定的时间之后执行任务                                                                            |
| ScheduledFuture\<?\> scheduleAtFixedRate(Runnable task, long initialDelay, long period TimeUnit unit)   | 预期在初始的延迟结束后，周期性的运行给定的任务，周期长度为period                                        |
| ScheduledFuture\<?\> scheduleWithFixedDelay(Runnable task, long initialDelay, long delay TimeUnit unit) | 预期在初始的延迟结束后，周期性的运行给定的任务，在一次调用完成和下一次调用开始之间有长度为delay的延迟。 |

## 备注

> TimeUnit用于表示时间颗粒度，即时间单位。
>
> TimeUnit.DAYS=天
>
> TimeUnit.HOURS=小时
>
> TimeUnit.MINUTES=分钟
>
> TimeUnit.SECONDS=秒
>
> TimeUnit.MILLISECONDS=毫秒
>
> TimeUnit.NANOSECONDS=毫微秒
>
> TimeUnit.MICROSECONDS=微秒

## 小结

> Thread表示一个线程。而Runnable表示一个异步任务，需要传递给一个Thread才能正式进行工作。线程池则是可以接收Runnable然后对Thread进行创建，删除等管理操作。在工作中推荐使用线程池的方式进行线程的创建和管理。

## 常见问题

## 死锁问题

## 死锁问题-死锁现象

> 死锁问题是多线程开发中一个很常见的问题，比如两个线程都持有了彼此线程需要的资源(锁)，但是释放资源的条件就是需要得到彼此线程持有的资源。导致出现这两个线程都在等待对方释放自己需要的资源后才会释放自己持有的资源的情况，这就是死锁现象。

## 死锁问题-死锁产生的必要条件

> 四个条件同时成立时就会产生死锁

- 互斥
  > 资源不共享，一次只有一个线程能占有。
- 占有并等待
  > 线程在占有一个资源的情况下等待另一个资源
- 非抢占
  > 一个资源不能在持有该资源的线程未主动释放的情况下被另一个线程进行抢占。
- 循环等待
  > 多个线程在持有的资源是其他的线程需要的，这些线程需要的资源也被其他的线程拥有，而且这些线程的持有和需要资源的情况形成了一个闭环。比如n个线程，第n-1个线程持有第n-2个线程需要的资源，但是第n-1个线需要的线程又被第n个线程占有，第n个线程需要的线程又被第1个线程占有，形成了一个闭环。

## 死锁问题-如何避免死锁

> 大多数系统都不会主动去处理死锁，Java也不能处理死锁问题。最好的办法就是合理设计，避免死锁的产生。

## 死锁问题-死锁DEMO

```java
/**
 * 死锁DEMO
 * 隐式锁实现
 * @author zhangyao
 * @version 1.0
 */
public class DeadLockDemo {
    static Object Resource1 = new Object();
    static Object Resource2 = new Object();

    public static void main(String[] args) {
        new Thread(()-> {
            synchronized(Resource1) {
                System.out.println("Resource1");
                try {
                    Thread.sleep(1000);// 模拟耗时，避免任务结束过快
                    synchronized(Resource2) {
                        System.out.println("Resource2 " + Resource2.toString());
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        new Thread(()-> {
            System.out.println("Resource2");
            synchronized(Resource2) {
                try {
                    Thread.sleep(1000);// 模拟耗时，避免任务结束过快
                    synchronized(Resource1) {
                        System.out.println("Resource1 " + Resource1.toString());
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
```

## 生产者和消费者问题

> [生产者消费者问题](https://zh.wikipedia.org/wiki/%E7%94%9F%E4%BA%A7%E8%80%85%E6%B6%88%E8%B4%B9%E8%80%85%E9%97%AE%E9%A2%98)也称有限缓冲问题，是一个多进程同步问题的经典案例。该问题描述了共享固定大小缓冲区的两个进程——即所谓的“生产者”和“消费者”——在实际运行时会发生的问题。生产者的主要作用是生成一定量的数据放到缓冲区中，然后重复此过程。与此同时，消费者也在缓冲区消耗这些数据。该问题的关键就是要保证生产者不会在缓冲区满时加入数据，消费者也不会在缓冲区中空时消耗数据。

## 生产者和消费者问题-解决思路

> 要解决该问题，就必须让生产者在缓冲区满时休眠（要么干脆就放弃数据），等到下次消费者消耗缓冲区中的数据的时候，生产者才能被唤醒，开始往缓冲区添加数据。同样，也可以让消费者在缓冲区空时进入休眠，等到生产者往缓冲区添加数据之后，再唤醒消费者。

## 生产者和消费者问题-具体实现

> 可以将缓冲区模拟为资源，通过对资源进行加锁来实现互斥。然后资源达到预设的阀值后唤醒消费者线程并使生产者线程等待。当资源达到最低阀值后唤醒生产者线程并使消费者等待。

## 生产者和消费者问题-实现DEMO

```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * 生产者消费者问题
 * 显式锁实现
 * 不推荐使用隐式锁的同步阻塞(客户端锁定)实现，容易产生异常。
 * @author zhangyao
 * @version 1.0
 */
public class ProducerConsumerDemo {
    /** 资源 */
    static Integer Resource = 0;
    /** 锁对象 */
    static ReentrantLock reentrantLock = new ReentrantLock();
    /** 条件变量 */
    static Condition condition = reentrantLock.newCondition();

    public static void main(String[] args) {
        /* 生产者 */
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    reentrantLock.lock();
                    try {
                        Thread.sleep(100); // 模拟耗时
                        System.out.println("Producer-Resource->" + Resource);
                        if (Resource == 5) {
                            condition.signalAll();
                            condition.await();
                        } else {
                            Thread.sleep(1000); // 模拟耗时
                            Resource = Resource + 1;
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } finally {
                        reentrantLock.unlock();
                    }
                }
            }
        }).start();

        /* 消费者 */
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    reentrantLock.lock();
                    try {
                        Thread.sleep(100); // 模拟耗时
                        System.out.println("Consumer-Resource->" + Resource);
                        if (Resource == 0) {
                            condition.signalAll();
                            condition.await();
                        } else {
                            Thread.sleep(1000); // 模拟耗时
                            Resource = Resource - 1;
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } finally {
                        reentrantLock.unlock();
                    }
                }
            }
        }).start();
    }
}
```
