# Java Socket

## 基础介绍

> TCP是面向连接的，将连接作为了最基本的抽象。
>
> TCP连接的端点称为套接字(socket)或插口。
>
> 根据RFC793的定义：端口号拼接到IP地址即构成了套接字。
>
> ——《计算机网络第七版》P212

## 常用工具类

### Socket

> 套接字类，提供获取输入数据流和写出数据流的功能。

#### 常用方法

| 方法                                                         | 介绍                                                                         |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Socket(String host, int port)                                | 根据主机地址host和端口号port构建套接字                                       |
| InputStream getInputStream()                                 | 获取读取数据的流                                                             |
| OutputStream getOutputStream()                               | 获取写出数据的流                                                             |
| void connect(SocketAddress Address)                          | 使套接字连接到指定的地址                                                     |
| void connect(SocketAddress Address, int timeoutMilliseconds) | 使套接字连接到指定的地址，并设置超时时间，如果超时InterruptedIOException异常 |
| void setSoTimeout(int timeout)                               | 指定连接超时时间（以毫秒为单位                                               |
| Boolean isConnected()                                        | 是否已经连接                                                                 |
| Boolean isClose()                                            | 是否已经关闭连接                                                             |
| void close()                                                 | 关闭套接字                                                                   |

#### 常见问题

#### 套接字超时问题-初始连接超时

- 情况介绍
  > 平常使用Socket(String host, int port)方法进行套接字构建，但是这个方法的缺陷时，如果目的主机不可达则会一直阻塞，只会受到底层系统的限制并才抛出异常。
- 解决办法

  > 为连接设置超时时间
  > 可以构建一个空的套接字(Socket)，然后调用void connect(SocketAddress Address, int timeoutMilliseconds)方法设置连接超时时间，超时抛出InterruptedIOException异常。

- InetSocketAddress
  | 方法 | 介绍 |
  | --- | --- |
  | InetSocketAddress(String host, int port) | 根据主机地址host和端口port创建一个InetSocketAddress |
- Demo

```java
// 原方式
try {
    Socket socket = new Socket("127.0.0.1", 8081);
} catch (IOException e) {
    e.printStackTrace();
}

// 新方式
try {
    Socket socket = new Socket();
    socket.connect(new InetSocketAddress("127.0.0.1", 8081), 100000);
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 套接字超时问题-连接中断导致读写超时

- 情况介绍

  > 在连接成功之后，可能会遇到连接中断的情况。很可能在读取数据或者写数据未完成时中断，但是又不会抛出异常导致一直阻塞，只会受到底层系统的限制并才抛出异常。

- 解决办法

  > 使用setSoTimeout()方法指定连接超时时间，超过时间会抛出SocketTimeoutException，可以捕获异常进行处理操作。

- Demo
  > 注意try catch语句和while的嵌套关系，while一般会放在try catch内部，不容易出现死循环抛出异常的情况。

```java
try {
    Socket socket = new Socket();
    socket.connect(new InetSocketAddress("127.0.0.1", 8084));
    socket.setSoTimeout(10000);

    while (true) {
        InputStream is = socket.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        System.out.println(br.readLine());
    }

} catch (SocketTimeoutException e) {
    e.printStackTrace();
} catch (SocketException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}
```

### ServerSocket

> 服务器套接字类，用于创建套接字(Socket)对象。

#### 常用方法

| 方法                                | 介绍                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| ServerSocket(String host, int port) | 创建服务器套接字                                                               |
| Socket accept()                     | 获取连接，返回套接字Socket对象。如果未获取到连接会一直阻塞，直到获取成功为止。 |
| void close()                        | 关闭服务器套接字                                                               |

#### 常见问题

## Socket Demo

### Server

```java
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Socket Demo - Server
 * @author zhangyao
 * @version 1.0
 */
public class ServerDemo {
    public static void main(String[] args) throws IOException {
        ExecutorService executorService = Executors.newCachedThreadPool();
        try (ServerSocket serverSocket = new ServerSocket(8084)) {
            while (true) {
                Socket socket = serverSocket.accept();
                executorService.submit(new ServerRunnable(socket));
            }
        }
    }

    static class ServerRunnable implements Runnable {
        private Socket socket;

        public ServerRunnable (Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName());
            PrintStream ps = null;
            BufferedReader br = null;
            try (InputStream is = socket.getInputStream();OutputStream os = socket.getOutputStream()) {
                br = new BufferedReader(new InputStreamReader(is));
                ps = new PrintStream(os);
                while (true) {
                    ps.println("欢迎连接服务器");
                    ps.flush();

                    while (true) {
                        String str = br.readLine();
                        ps.println("your input: " + str);
                        ps.flush();
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println(Thread.currentThread().getName() + "->退出");
            }
        }
    }
}
```

### Client

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.util.Scanner;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Socket Demo - Client
 * @author zhangyao
 * @version 1.0
 */
public class ClientDemo {
    public static void main(String[] args) throws IOException {
        try (Socket socket = new Socket("127.0.0.1", 8084)) {
            ReentrantLock lock = new ReentrantLock();
            Condition condition = lock.newCondition();

            new Thread(new ReadRunnable(socket, lock, condition)).start();
            new Thread(new WriteRunnable(socket, lock, condition)).start();
        }
    }

    public static class ReadRunnable implements Runnable {
        ReentrantLock lock;
        Condition condition;
        BufferedReader br;
        Socket socket;

        public ReadRunnable(Socket socket, ReentrantLock lock, Condition condition) {
            this.socket = socket;
            this.lock = lock;
            this.condition = condition;
        }

        @Override
        public void run() {
            try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
                this.br = bufferedReader;

                while (true) {
                    String str = br.readLine();
                    System.out.println(str);

                    if (!br.ready()) {
                        condition.signalAll();
                        condition.await();
                    }
                }
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static class WriteRunnable implements Runnable {
        ReentrantLock lock;
        Condition condition;
        Socket socket;
        PrintStream ps;

        public WriteRunnable(Socket socket, ReentrantLock lock, Condition condition) {
            this.socket = socket;
            this.lock = lock;
            this.condition = condition;
        }

        @Override
        public void run() {
            try (PrintStream printStream = new PrintStream(socket.getOutputStream())) {
                this.ps = printStream;

                while (true) {
                    try (Scanner scanner = new Scanner(System.in)) {
                        String str = scanner.nextLine();
                        if (str != null) {
                            ps.println(str);
                            ps.flush();

                            condition.signalAll();
                            condition.await();
                        }
                    }
                }
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```
