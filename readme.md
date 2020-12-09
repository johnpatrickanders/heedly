# Heedly
​
## Table of Contents
* [Technologies](#technologies)
* [Feature List](#feature-list)
* [React Components](#react-components)
* [Database Schema](#database-schema)
* [Frontend Routes](#frontend-routes)
* [API Routes](#api-routes)
* [Redux Tree](#redux-tree)
* [User Stories](#user-stories)
​
## <a name="technologies"></a>Technologies
- JavaScript
- React
- Express
- Redux
- HTML5 / CSS3
- Material-UI
- Sequelize
​
## <a name="feature-list"></a>Features - MVP
--------------
* [Sign-Up and Login pages](#Auth) 
* [Breaking News] A viewable feed of top news articles from the Feedly API
* [Expand Article] Ability to click on item in feed to view article and link to news source
* [Mark Reads] Ability to mark article as read or unread, and a Read page that renders a list of "read" articles
​
### <a name="Auth"></a>Sing-up and Login
​
### <a name="Breaking-News"></a>Breaking News
​
### <a name="Expand-Article"></a>Expand Article
​
### <a name="Mark-Reads"></a>Mark Reads
​
## <a name ="react-components"></a>React Components
- BrowserRouter, Switch, Redirect, NavLink, from react-router-dom
- Basic hooks including useEffect, useState, useSelector, useDispatch, useHistory
- GridList/GridListTile, Paper, Icon, Popover, Typography & more from Material-UI React library
​
## <a name="database-schema"></a>Database Schema
------
1. Users
    - name
    - email
    - password hash
​
2. UserHeeds (i.e. Articles associated with user)
    - id
    - url
    - content
    - img
    - publishedAt
    - title
    - author
    - description
    - createdAt
    - updatedAt
​
3. UserMarks (joins table between User and UserHeed)
    - id
    - userId
    - userHeedId
    - createdAt
    - updatedAt
​
4. Leanings
    - id
    - politicalAffiliation
    - createdAt
    - updatedAt
​
​
## <a name="frontend-routes"></a>Frontend Routes
### /signup
-------
- Form generated with `get` request, submit will `post` name, email, password, political leaning.
- Utilize Bcrypt for user authentication & authorization (storing password hash to database).
​
### /login
------
- Form generated with `get` request, submit will `post` email & password.
- Utilize Bcrypt for user authentication & authorization.
​
### /news
------
- Table generated with `get` request, pulling articles from existing feeds.
- Clicking on article will bring you to article read page.
- Ability to mark as read.
### /expand-article
------
- View a selected article's content
​
## <a name="api-routes"></a>API Routes
### /users (GET, DELETE)
### /users/token (POST)
### /users/signup (POST)
### /users/login (PUT, POST)
​
## <a name="user-stories"></a>User Stories
------------
1. As a typical user, I want to see the news most relevant to my interests.
2. As a typical user, I want to save articles based on my interest so that I can reference them later.
3. As a politically-conscious user, I want to mindfully browse the news by source so as to compare what multiple sources are covering.
​
### Bonus (not done): Feeds selection showing sources based on genre
------------------------------------------------------
- Add to "Table of Articles" page.
​
### Bonus (not done): Ability to mark Article as Most Important of the Day 
-----------------------------------------------------------
- Users to mark an article from END of article view.
- Display ranking of most HEEDed articles
- Include on designated "Suggestion" page and/or on Events Dashboard.
