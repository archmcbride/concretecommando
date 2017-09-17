var myRouter = new VueRouter({
    routes: [
       
        {
            path: '/',
            // because we don't have the component initially, we write a function that defines how to get it, using AJAX
            // when we finally have the component, we RESOLVE it. if we fail to retrieve the component, we REJECT.
            component: {
               template: `<div class="container" >
                   <div class="row project">
                        
                            <div class="col-lg-12">
                               <h3> A 3rd generation construction company, built on loyalty and quality construction</h3> 
                               <br >
                            <p>In 1948, Don Conroy started Don Conroy Contractor Inc, providing concrete construction for Topeka, Kansas and the surrounding area. 
                               His youngest son, Joe Conroy, started working with him in 1966 at 14 years old. In 1978, Joe took over the company,
                             renaming it Joe Conroy Contractor Inc. His sons, Kyle Conroy and Jamie Gingrich, have worked for him since they were in their teens, 
                             assisting on all crews to learn the business from the ground up. In 2016, Jamie and Kyle bought out Joe, and, following the family tradition, 
                             changed the name to the more inclusive, Conroy Contractors Inc. </p>
                              <p>Concrete construction work for residential and commercial.

                              Services/Products:Foundations, walls, flat work, steps, sidewalks, pavement, decorative concrete, colored concrete, stamped concrete, patios/driveways</p>
                            </div>
                            <div class="col-sm-4"><img src="images/conroymen.jpg" class="img-responsive conroypic" alt="Responsive image"></div>
                          
                        
                   </div>
                 <!--Change text to white once the size is smaller than 992px-->
               </div>`
            }
            // component: {
            //     template: '<h1>hello</h1>'
            // }
        },
        {
            path: '/contacts',
            // because we don't have the component initially, we write a function that defines how to get it, using AJAX
            // when we finally have the component, we RESOLVE it. if we fail to retrieve the component, we REJECT.
            component: {
                template:
                `<div class="container table stretch-v ">
                  <div class="row stretch-v"> 

                          <div class="col-md-12"><p>Contact me!</p></div>
                          <div class="col-md-8"><p>Email: archmcbride@hotmail.com</p></div>
                   </div>  
                </div>`
            }
        },
        {
            path: '/projects',
            component: {
                template:
                `<div class="container">
                      <div class="row project">
                          
                          <div class="col-md-6"><img src="images/thelofts.jpg" class="img-responsive minion" alt="Responsive image"></div>
                          <div class="col-md-6"><img src="images/thelofts_complete.jpg" class="img-responsive minion" alt="Responsive image"></div>
                          <div class="col-md-6"><p>The Lofts - during construction, Lawrence, KS</p></div>
                          <div class="col-md-6"><p>The Lofts - completed, Lawrence, KS</p></div>
                          
                      </div><br />

                      <div class="row project">
                          <div class="col-md-4"><img src="images/midwestHealthAquaticsCtr.jpg" class="img-responsive minion" alt="Responsive image"></div>
                          <div class="col-md-8"><p>Midwest Health Aquatics Center, Topeka, KS</p></div>
                          
                      </div><br />

                      <div class="row project">
                          <div class="col-md-4"><img src="images/church.jpg" class="img-responsive minion" alt="Responsive image"></div>
                          <div class="col-md-8"><p>Fellowship Bible Church, Topeka, KS</p></div>
                      </div><br />
                </div>`
            }
        },
        {
            path: '/clientlogin',
            component: {
                data:function(){
                  return {
                      newUserName : '', 
                      newUserPassword : '', 
                      oldUserName : '', 
                      oldUserPassword : '', 
                      user    : {}, 
                      client : {},
                      //progress: [],
                      //displayedProgress: [],
                  }
                },
                methods : {
                    createUser : function(event){
                        event.preventDefault()
                        var that = this;
                        // inside of a vue method, we can use `this` to access any data or method on that VM.
                        // always send an object when using AJAX
                        //console.log(this.newUserName)

                        $.ajax({
                            url: '/client',
                            type: 'POST',
                            data: JSON.stringify({username: this.newUserName, password: this.newUserPassword}),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: (dataFromServer) => {
                                console.log(dataFromServer)//in Console in browser
                                // if ( dataFromServer.success ) {
                                //     window.location.href="/dash"

                                // }
                            }
                        })
                    },
                    signInUser : function(event){
                        event.preventDefault()
                        var that = this;
                        //console.log(this.oldUserName)

                        $.ajax({
                            url: '/signin-user',
                            type: 'POST',
                            data: JSON.stringify({username: this.oldUserName, password: this.oldUserPassword}),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: (dataFromServer) => {
                                // console.log('main.js', dataFromServer.username)
                                    mainVm.user = dataFromServer
                                    myRouter.push('/dash')

                                
                            }
                        })
                    },

                },
                template:
                `<div class="container">
                      <div class="row">
                          
                          <div class="col-md-6">
                             <div id="app">
                                 <h3 class="frontTitle">Create Account</h3>
                                 <form class="form" v-on:submit="createUser">
                                     <input v-model="newUserName" placeholder="Name">
                                     <input v-model="newUserPassword" placeholder="Password">
                                     <input type="submit" value="Submit" class="btn btn-sm btnColor">
                                 </form>
                                 <h3 class="frontTitle">Login</h3>
                                 <form class="form" v-on:submit="signInUser">
                                     <input v-model="oldUserName" placeholder="Name">
                                     <input v-model="oldUserPassword" placeholder="Password">
                                     <input type="submit" value="Login" class="btn btn-sm btnColor">
                                 </form> 
                            </div>
                          </div>   
                      </div><br />
                </div>`
            }
        },
        {   //logged in dashboard
            path: '/dash',
            component: {
                    data:function(){
                      return {
                          newUserName : '', 
                          newUserPassword : '', 
                          oldUserName : '', 
                          oldUserPassword : '', 
                          user    : mainVm.user, 
                          client : {},
                          projectname : '',
                          cost: '',
                          startdate: '',
                          //progress: [],
                          //displayedProgress: [],
                      }
                    },
                    methods : {
                        createProject : function(event){
                            event.preventDefault()
                            var that = this;
                            // inside of a vue method, we can use `this` to access any data or method on that VM.
                            // always send an object when using AJAX
                            //console.log(this.newUserName)
                            $.ajax({
                                url: '/create-project',
                                type: 'POST',
                                data: JSON.stringify({projectname: this.projectname, cost: this.cost, startdate: this.startdate}),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: (dataFromServer) => {
                                    //console.log(dataFromServer)//in Console in browser
                                }
                            })
                        },
                        getProjects : function(event){
                          event.preventDefault()
                          var that = this;

                          $.ajax ({
                            url: '/all-projects',
                            type: 'GET',
                            data: JSON.stringify({projectname: this.projectname, cost: this.cost, startdate: this.startdate}),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: (dataFromServer) => {
                                console.log(dataFromServer)//in Console in browser
                            }   


                          })

                        },
                    },
                    template:
                        `<div class="container">
                            <div class="row project">
                              <h3 class="frontTitle">Welcome, {{user.username}}</h3>
                              <br>
                              <br>
                            </div>
                            <div class="row project">  
                              <h3 class="frontTitle">Create Project</h3>
                                  <form class="form" v-on:submit="createProject"><br /><br /><br />
                                      <div class="row project"> 
                                          
                                          <input v-model="projectname" placeholder=" Project Name">
                                          <input v-model="cost" placeholder="Cost">
                                          <input type="date" v-model="startdate" placeholder="Start Date">
                                          <input type="submit" value="Create Project" class="btn btn-sm btnColor">
                                      </div>
                                  </form> 
                               
                            </div><br />
                    </div>`
                }
            },
    ]
})




var mainVm = new Vue({
    el: '#app',
    router: myRouter,
    data: {
      user: ''
    }
})
