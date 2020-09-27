# FEATURES TEMPLATE - heedly
​
## User Stories
------------
1. As a typical user, I want to see the news most relevant to my insterests.
2. As a typical user, I want to save articles based on my interest so that I can reference them later.
3. As a politically-minded user, I want to browse news based on who is highly recommending it so that I can stay informed of my group's and the other group's most essential media influences.
​
## Features - MVP
--------------
- [ ] Sign-Up page where users submit their name, email, password, and political leaning
    - [ ] Log-in page where users provide their email and password to log into the site
- [ ] A viewable feed of top news articles from the Feedly API
- [ ] Ability to click on item in feed to view article
- [ ] Ability to mark article as read or unread
    - [ ] Read page that renders a list of read articles
​
Feeds
Sources
Articles
Reads
Bonus: Favorites
Bonus: Search

## Additional Features
-------------------
- [ ] Ability to mark article as what the other side should pay most attention to and view ranking of most HEEDed articles, one per 24hrs
- [ ] Search for feeds sources
        - [ ] Choosing seeds (adding and removing and viewing) (???)
- [ ] Ability to mark article as favorite and show favorites
​
## Tables
------
1. Users
    - name
    - email
    - password hash
    - political leaning (optional)
    - heedOfTheDay (optional)
​
2. Articles
    - id 
    - feed
​
3. Feeds
    - cityId (belongsTo Cities.id)
    - date & time
    - venue/address
    - name
    - description
    - hostId (belongsTo Users.id)
    - [additional feature] number of people attending
    - [additional feature] limit number of people attending
​
4. Join Table - Read
    - userId (belongsToMany Users.id)
    - articleId (belongsToMany Articles.id)
​
​
## Pages & Routes
--------------
### Sign-Up
-------
- Form generated with `get` request, submit will `post` name, email, password, political leaning.
- Utilize Bcrypt for user authentication & authorization (storing password hash to database).
​
### Log-In
------
- Form generated with `get` request, submit will `post` email & password.
- Utilize Bcrypt for user authentication & authorization, as well as JWT.
​
### Table of Articles
------------------
- Table generated with `get` request, pulling articles from existing feeds.
- Clicking on article will bring you to article read page.
- Ability to mark as read.
​
### Event Details Page
------------
- Details generated with `get` request (attending users viewable as an additional feature).
- Host user has the ability to cancel an event (`delete` Event row/entry).
- User has the ability to join event (`post` request would generate an entry in the Joint Table).
​
### Dashboard of joined events/hosted events
----------------------------------------
- Table of joined/hosted events generated with `get` request.
- Clicking on event will bring you to event details page.
- [Additional feature] different styling of cell if hosted event.
​
### Bonus: Feeds selection showing sources based on genre
------------------------------------------------------
- Add to "Table of Articles" page.
​
### Bonus: Ability to mark Article as HEED
-----------------------------------------------------------
- Users to mark an article from END of article view.
- Display ranking of most HEEDed articles
- Include on designated "Suggestion" page and/or on Events Dashboard.
