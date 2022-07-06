


$(document).ready(() => {
let apiToken = $(`#apiToken`).data("token");
console.log("ready" ,  $("#loadEvents"));
    $(".eventsContainer").remove();
    $("#loadEvents").on("click",() => {
        
        $(".events-body").html('');
        $(".events-body").append(
            `<div class="eventsContainer" style="align-items: center;  margin-left: 30px; display: flex; flex-direction: row; gap: 10%;" ></div>`
            )
            $.get(`/api/events?apiToken=${apiToken}`, (data) => {
                console.log("data", data);
                data.forEach((event) => {
                    $(".eventsContainer").append(
                        `<div class="events" style="  margin-right: 10px>
                            <p style="font-weight: bold; margin-right: 10px;">
                                ${event.name}
                            </p>
                            <p style="course-description margin-right: 10px; ">
                                ${event.location}
                            </p>
                            <p style="course-description margin-right: 10px; ">
                                ${event.price} €
                            </p>
                            <button data-id="${event.id} class="saveButton"> ${event.joined ? "Saved" : "Save"}</button>
                        </div>`
                    );
                });
                    }).then(() => {3
                        console.log("1");
                        addSaveButtonListener();
                });
            });
   

  
});


const addSaveButtonListener =  () =>  {
    console.log("2", $(".saveButton"));
        $(".saveButton").on('click',  (event) => {
            console.log("3");
            let $button = $(event.target),
            eventId = $button.data("id");
            $.get(`/api/events&${eventId}/save`, (results = {}) => {
                let data = results.data;
                if(data && data.success){
                    $button.text("Saved")
                }else{
                    console.log("4");
                    $button.text("Try again");
                    
                }
                console.log("5");
            })
            console.log("6");
        })
        console.log("7");
   }