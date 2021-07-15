var apiNews = "http://localhost:3000/posts"

function start(){
    getApi()
}
start()


function getApi(api, callback) {
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function handleDeleteNews(){
    
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    fetch(cmtApi+'/'+id,options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            //getCourses(renderCourse);//renderCourse
            var courseItem = document.querySelector(`.comment-item-${id}`);
            if(courseItem){
                courseItem.remove();
            }
        });
}
