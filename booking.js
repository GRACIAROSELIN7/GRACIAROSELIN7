
let locationValue = "";
async function pageload() {
    document.getElementById('txtUser').innerHTML = sessionStorage.display_name;
    if (sessionStorage.user_type == 2) {
        document.getElementById("btnPopup").style.visibility = "hidden";
    }
    const param = {
        id: 0,
        user_id: sessionStorage.user_id,
        isVendor: sessionStorage.user_type == 2 ? true : false
    };

    const _BookingRes = await api('Booking_Controller/getbooking', param);


    const _pr = _BookingRes.filter((item) => !(+item.isClosed)).map((item, i) => {
        return `<div class="table-row">
                    <div class="table-data">${item.id}</div>
                    <div class="table-data">${item.type}</div>
                    <div class="table-data">${item.category}</div>
                    <div class="table-data">${item.bookeddate}</div>
                    <div class="table-data"> ${sessionStorage.user_type == 2 ? `<button onclick="getDirection('${item.location}')">Get Direction</button>` : `<div>${item.location}</div>`}</div>
                    <div class="table-data">${item.contactnumber}</div>
                    <div class="table-data">${item.contactname}</div>
                    <div class="table-data">${item.user_name || "Waiting to Accept"}</div>
                     ${sessionStorage.user_type == 2 ? `<div class="table-data"><button  onclick=${+item.servicedBy ? `"closeAction(${item.id})"` : `"acceptAction(${item.id})"`}>${+item.servicedBy ? "Close" : "Accept"}</button></div>` : `<div class="table-data" onclick="cancelRequest(${item.id})"><button>Cancel Request</button></div>`}
                </div>`
    });
    document.getElementById('activeBookingtable').innerHTML = _pr.join("");

    const _booking = _BookingRes.filter((item) => (+item.isClosed)).map((item, i) => {
        return `<div class="table-row">
                    <div class="table-data">${item.id}</div>
                    <div class="table-data">${item.type}</div>
                    <div class="table-data">${item.category}</div>
                    <div class="table-data">${item.bookeddate}</div>
                    <div class="table-data">${item.contactnumber}</div>
                    <div class="table-data">${item.contactname}</div>
                    <div class="table-data">${item.user_name}</div>
                    <div class="table-data">${item.closedDate}</div>
                     <div class="table-data">${sessionStorage.user_type == 2 ? "" : "<button>Review</button>"}</div>
                </div>`
    });
    document.getElementById('closedBookingtable').innerHTML = _booking.join("");


    initMap();

}

function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
        });

        locationValue = position.coords.latitude + "," + position.coords.longitude;

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            title: 'Marker',
            map: map,
            draggable: true
        });

        google.maps.event.addListener(marker, 'dragend', function (ev) {
            locationValue = marker.getPosition().lat().toFixed(5) + "," + marker.getPosition().lng().toFixed(5); // new LatLng-Object after dragend-event...
        });

        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById("sidebar"));

        const control = document.getElementById("floating-panel");

        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    }
}

initMap();

async function addBooking() {
    const data = {
        type: document.getElementById('service').value,
        category: document.getElementById('category').value,
        bookeddate: new Date().toISOString().split('T')[0],
        contactnumber: document.getElementById('contactnumber').value,
        contactname: document.getElementById('contactname').value,
        description: document.getElementById('description').value,
        location: locationValue,
        user_id: sessionStorage.user_id
    }
    await api('Booking_Controller/addbooking', data);
    window.location.href = "./booking.html";
    pageload();
}


async function acceptAction(id) {
    //sessionStorage.user_id

    const param = {
        id: id,
        user_id: sessionStorage.user_id
    }

    await api('Booking_Controller/bookingAcceept', param);
    pageload();

}


async function cancelRequest(id) {



    const param = {
        id: id
    }

    await api('Booking_Controller/bookingCancel', param);
    pageload();


}

async function closeAction(id) {


    const param = {
        id: id,
        closedDate: new Date().toISOString().split('T')[0]
    }

    await api('Booking_Controller/bookingClosed', param);
    pageload();
}

function getDirection(location) {
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${locationValue}&destination=${location}`, '_blank');
}