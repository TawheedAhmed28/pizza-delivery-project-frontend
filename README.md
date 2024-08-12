# Pizza Delivery API - deployed link [here](https://pizza-delivery-api.netlify.app/)

#### Solo project - full stack app using Django, React and PostgreSQL, made within 9 days. Users can add pizzas customisable by toppings, and orders, with one or more pizzas. Both pizzas and orders have full CRUD functionality.

### Technologies used

#### Front end:
- JSX
- React
- CSS (Tailwind)
- HTML
- React Select
- React Toastify

#### Back end:
- Python
- Django
- Django REST framework
- PostgreSQL
- pyjwt
- psycopg2

![Pizza Delivery API Homepage](./readme-images/homepage.png "Homepage")

---

### Brief

- The app uses Django to render templates to users.
- PostgreSQL is used as your database management system.
- The app uses Django for session-based authentication.
- Implement authorisation - guests (users not signed in) must only be able to read data and not create, update or delete.
- The app must have at least one data entity as well as the User model, and at least one data entity must be related to the User model.
- Full CRUD functionality.
- App is deployed online.

---

### Code installation

#### Back end:

Run `pipenv install` to install dependencies.

Run `python manage.py loaddata pizzas/seeds.json` to load data for pizzas and toppings into the database. Note that you will not be able to load data for orders, as these require user IDs, which have not been dumped in a `seeds.json` file. You can still make users and your own orders though!

Run `python manage.py runserver` to run the app.

#### Front end:

Run `npm i` to install dependencies.

Run `npm run dev` to run the app.

---

### Planning

I created a **Trello** board (located [here](https://trello.com/b/rlTTfa8D/project-4-plan)) for this project. My wireframe and ERD can be seen below.

![Pizza API wireframe](./readme-images/wireframe.png "Wireframe")
![Pizza API ERD](./readme-images/erd.png "ERD")

---

### Build process
