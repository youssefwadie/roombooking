# roombooking
An example (actually for practice) of migrating a MVC application to Angular

**Test it locally**

```shell
$ git clone https://github.com/youssefwadie/roombooking.git
```

* run spring boot
```shell
$ cd roombooking
$ mvn spring-boot:run
```
* run angular
```shell
$ cd RoomBookingClient
$ npm install
$ ng s
```

**To test only the ui without any backend, run the app with local environment configuration**
```shell
$ cd roombooking
$ npm install
$ ng s -c local
```

- **Admin user** **::** username: `youssef`, password: `secret`
- **Normal user** **::** username: `john`, password: `secret`
