# Project Base for Vaadin and Spring Boot

This project can be used as a starting point to create your own Vaadin application with Spring Boot.
It contains all the necessary configuration and some placeholder files to get you started.

The best way to use it by via [vaadin.com/start](https://vaadin.com/start) - you can get only the necessary parts and choose the package naming you want to use.

## Running the Application

Import the project to the IDE of your choosing as a Maven project. 

Run application using `mvn spring-boot:run` or directly running Application class from your IDE. 

Open http://localhost:8080/ in browser

If you want to run your app locally in the production mode, run `mvn spring-boot:run -Pproduction`.

## Structure

Vaadin web applications have client-side and server-side counterparts.

| Directory | Description |
| :--- | :--- |
| `frontend/` | Client-side source directory |
| &nbsp;&nbsp;&nbsp;&nbsp;`index.html` | Initial HTML |
| &nbsp;&nbsp;&nbsp;&nbsp;`index.ts` | Frontend Entrypoint |
| &nbsp;&nbsp;&nbsp;&nbsp;`main-layout.ts` | Main layout Web Component |
| &nbsp;&nbsp;&nbsp;&nbsp;`views/` | Client-side views directory (Web Components) |
| &nbsp;&nbsp;&nbsp;&nbsp;`styles/` | Styles directory (CSS) |
| `src/main/java/<groupId>/` | Server-side source directory |
| &nbsp;&nbsp;&nbsp;&nbsp;`Application.java` | Server Entrypoint |

## More Information

<!-- FIXME: Use a link from vaadin.com -->
- [Quick Start Guide](https://github.com/vaadin/flow-and-components-documentation/blob/ccdm/documentation/ccdm/quick-start-guide.asciidoc) for Vaadin client-side applications
- [Vaadin Flow](https://vaadin.com/flow) website

