# JAVA 多线程 转账Demo

## 介绍

练习锁和条件变量的用法

## 代码

### Task.java

```java
import java.util.concurrent.locks.ReentrantLock;

/**
 * 多线程转账demo
 * 练习锁和条件变量的用法
 * 设置只有两个账户的账户列表, 第一个线程内容是第二个账户给第一个账户转账, 并且转账金额超出自身账户余额.
 * 第一个线程内容是第二个账户给第一个账户转账. 转账成功之后恰好满足第一个线程的转账条件, 使第一个转账继续执行.
 * 通过模拟耗时, 使第一个线程先于第二个线程执行.
 * @author zhangyao
 * @version 1.0.0
 * @date 2022-03-10
 */
public class Task {
    public static void main(String[] args) {
        ReentrantLock lock = new ReentrantLock();
        /* 账户列表 */
        final int[] acctList = {500, 1000};
        BankService bankService = new BankService(acctList, lock);

        new Thread(()-> {
            lock.lock();
            try {
                System.out.println(Thread.currentThread().getId() + "-->begin!");

                /* 模拟耗时 */
                Thread.sleep(2000);
                bankService.transfer(0, 1, 1200);

                System.out.println(Thread.currentThread().getId() + "-->acct-0: " + bankService.getAcctBalance(0));
                System.out.println(Thread.currentThread().getId() + "-->acct-1: " + bankService.getAcctBalance(1));

                System.out.println(Thread.currentThread().getId() + "-->over!");
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }).start();

        new Thread(()-> {
            lock.lock();
            try {
                System.out.println(Thread.currentThread().getId() + "-->begin!");

                /* 模拟耗时 */
                Thread.sleep(3000);
                bankService.transfer(1, 0, 300);

                System.out.println(Thread.currentThread().getId() + "-->acct-0: " + bankService.getAcctBalance(0));
                System.out.println(Thread.currentThread().getId() + "-->acct-1: " + bankService.getAcctBalance(1));

                System.out.println(Thread.currentThread().getId() + "-->over!");
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }).start();
    }
}
```

### BankService.java

```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author zhangyao
 * @version 1.0.0
 * @date 2022-03-10
 */
public class BankService {
    private final int[] acctList;
    private ReentrantLock lock = null;
    private Condition condition = null;

    public BankService(int[] acctList, ReentrantLock lock) {
        this.acctList = acctList;
        this.lock = lock;
        this.condition = lock.newCondition();
    }

    /**
     * 转账
     * 如果转账金额大于出钱方余额, 会使任务进入等待状态.
     * @date 2022-03-10
     * @param in 入钱方
     * @param out 出钱方
     * @param money 金额
     * @return void
     **/
    public void transfer(int in, int out, int money) {
        lock.lock();
        try {
            System.out.println(Thread.currentThread().getId() + "-->transfer-->start!");

            /* 模拟耗时 */
            Thread.sleep(2000);
            while (acctList[out] < money) {
                condition.await();
            }

            acctList[out] -= money;
            acctList[in] += money;

            System.out.println(Thread.currentThread().getId() + "-->transfer-->over!");
            condition.signalAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public int getAcctBalance(int id) {
        lock.lock();
        try {
            return acctList[id];
        } finally {
            lock.unlock();
        }
    }
}
```
