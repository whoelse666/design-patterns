class UserService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getUser(id) {
    return this.apiService.get(`/users/${id}`);
  }
}

class ApiService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  get(url) {
    return this.httpService.get(url);
  }
}

class HttpService {
  get(url) {}
}

const httpService = new HttpService();
const apiService = new ApiService(httpService);
const userService = new UserService(apiService);

userService.getUser(1);


/*在上面的代码中， UserService、 ApiService、 HttpService三个类之间都存在依赖关系。使用依赖注入模式，可以将这些依赖关系从内部移到外部，从而实现对象之间的解耦。在实例化 UserService对象时，将依赖的 ApiService对象作为参数传入构造函数；在实例化 ApiService对象时，将依赖的 HttpService对象作为参数传入构造函数。这样就实现了依赖注入。

每个设计模式都有其适用的场景和优缺点，需要根据具体情况来选择使用。其实，还有很多其他设计模式，MVC模式（Model-View-Controller）、MVVM模式（Model-View-ViewModel）、组件模式（Component Pattern）等等，这里就不多介绍了，上文讲到的面试肯定够用了，但要真正融合进自己的项目中，还要多思考多理解多实践，认识和应用设计模式可以帮助我们编写更好的代码，提高代码的可读性、可维护性和可扩展性。

我们可以使用 inversify 进行 DI 实践
https://www.npmjs.com/package/inversify

nestjs的依赖注入相对简单，大家可以先从nestjs入门
https://docs.nestjs.com/first-steps  */