### Fainting app
##### Graduation project Computer Engineering at Taif University

### About the Project : 
##### A device used to detect fainting cases inside elevators and send help if found, and Website app to display all detected cases to the admin.

#### Software of this project conatins :
- BackEnd , website server
- [FrontEnd](https://github.com/ibraKH/fainting-app-frontend)
- Arduino uno code

#### ER diagram of the project 
![](/diagram/er.svg)

#### Backend endpoints : 
- admin :
    - /admin/new : to store new admin
    - /show/:admin_id : to show all admins stored
    - /show/ : login
- case :
    - /case/new : to store new fainting case , this only valid from arduino uno request
    - /show/:admin : display all cases 
    - /show/case/:admin/:id : display specific case by id
    - /store/case/:device : display all cases that detected by specific device
- device :
    - /new/:admin_id : store new device data 
    - /show/:admin_id : show all store devices 

#### Tech used : 
- Nodejs
- Express
- PostgreSQL
- Bcrypt
  
  
#### Supervisor : 
- Dr. Fahad Mohammed Alhomayani

#### Team member : 
- Khaled Alzahrani
- Ibrahim Alharthi - Software leader
- Omar Altuwairqi
- Hussam Althagafi
 

  
