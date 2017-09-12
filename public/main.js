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
        }
    ]
})




var mainVm = new Vue({
    el: '#app',
    router: myRouter,
    data: {
    }
})
