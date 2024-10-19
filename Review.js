// const reviews = [{
//     userId: 1,
//     name: "Roselin",
//     comment: "a formal assessment of something with the intention of instituting change if necessary",
//     rating: 4
// }, {
//     userId: 2,
//     name: "King",
//     comment: "a formal assessment of something with the intention of instituting change if necessary",
//     rating: 1
// }, {
//     userId: 3,
//     name: "raja",
//     comment: "a formal assessment of something with the intention of instituting change if necessary",
//     rating: 3
// }, {
//     userId: 4,
//     name: "Rahul",
//     comment: "a formal assessment of something with the intention of instituting change if necessary",
//     rating: 2
// }];

let booking_id="";
async function pageReviewload(id) {
    booking_id=id;
    const param = {
        booking_id: id
    };
    const reviews = await api('Review_Controller/getReviews', param);

    const reviewElements = reviews.map(review => {
        return `
             <li>
                <p><b>${review.display_name}</b><span style="float: right;">${review.created_at}</span></p>
                <div style="padding-bottom: 5px;">
                    Rating: ${review.rating}
                    ${review.user_id == sessionStorage.user_id ? `<input type="button" value="Delete" style="float: right;" onclick="deleteReview(${review.id})"/>` : ""}
                    
                </div>
                <div>${review.comment}</div>
            </li>
        `;
    });

    document.getElementById('viewRatings').innerHTML = reviewElements.join("");
}

async function addReview() {
    const param = {
        booking_id: sessionStorage.booking_id,
        user_id: sessionStorage.user_id,
        rating: document.getElementById('reviewRating').value,
        comment: document.getElementById('reviewComment').value,
        booking_id:booking_id,
        created_at:new Date().toISOString().split('T')[0]
    };
    await api('Review_Controller/addReview', param);
    pageReviewload(booking_id);
}

async function deleteReview(id) {
    const param = {
        id: id
    };
    await api('Review_Controller/deleteReview', param);
    pageReviewload(booking_id);
}

