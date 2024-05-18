
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6a3RzYWpuZ3J4YWV6cmN3eHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2OTY2MDIsImV4cCI6MjAzMTI3MjYwMn0.ZHBqqMvsIX-_MaEU8dYi4hv9W7nTJUuYY9KJF9hJUw4";

const url = "https://pzktsajngrxaezrcwxuv.supabase.co";

const database = supabase.createClient( url, key );

let savepd = document.querySelector( "#savepd" );
let firstpage = document.getElementById( 'firstpage' );
let secondpage = document.getElementById( 'secondpage' );
let page = document.getElementsByClassName( 'page' );


savepd.addEventListener( "click", async ( e ) => {
    e.preventDefault();
    checkCheckbox();
    checkCheckbox1();
    checkCheckbox2();
    checkCheckbox3();
    let fullName = document.querySelector( "#fullName" ).value;
    let email = document.querySelector( "#email" ).value;
    let dob = document.querySelector( "#dob" ).value;
    let contactNumber = document.querySelector( "#contactNumber" ).value;
    let pizza = document.querySelector( "#myCheckbox" ).value;
    let pasta = document.querySelector( "#myCheckbox1" ).value;
    let papandwors = document.querySelector( "#myCheckbox2" ).value;
    let other = document.querySelector( "#myCheckbox3" ).value;
    let movies = document.querySelector( 'input[name="movies"]:checked' ).value;
    let radio = document.querySelector( 'input[name="radio"]:checked' ).value;
    let eatout = document.querySelector( 'input[name="eat"]:checked' ).value;
    let tv = document.querySelector( 'input[name="TV"]:checked' ).value;
    savepd.innerText = "Saveing....";
    savepd.setAttribute( "disabled", true );

    let res = await database.from( "Personal_Detail" ).insert( {
        fullname: fullName,
        contactnumber: contactNumber,
        email: email,
        dateofbirth: dob,
        pizza: pizza,
        pasta: pasta,
        papandwors: papandwors,
        movies: movies,
        other: other,
        radio: radio,
        eatout: eatout,
        tv: tv
    } )
    if ( res ) {
        alert( "Personal_Details Added Successfully" )
        savepd.innerText = "Save"
        savepd.setAttribute( "disabled", false );
        fullName = "";
        contactNumber = "";
        email = "";
        dob = "";
        pizza = "";
        pasta = "";
        papandwors = "";
        other = "";
        getpersonal();
        getTotalCount();
        gotoPage( "page", "secondpage" );



    } else {
        alert( "Student Not Add Successfully" )
        savepd.innerText = "Save"
        savepd.setAttribute( "disabled", false );
    }
} )

function gotoPage( closePage, openPage ) {
    var pages = document.getElementsByClassName( closePage );
    for ( var i = 0; i < pages.length; i += 1 ) {
        pages[i].style.display = 'none';
        document.getElementById( openPage ).style.display = "block";
    }
}


const getpersonal = async () => {
    let tbody = document.getElementById( "tbody" );
    let loading = document.getElementById( "loading" );
    let tr = "";
    loading.innerText = "Loadding...."
    const res = await database.from( "Personal_Detail" ).select( "*" );
    if ( res ) {
        for ( var i in res.data ) {
            tr += `<tr>
         <td>${parseInt( i ) + 1}</td>
         <td>${res.data[i].fullname}</td>
         <td>${res.data[i].email}</td>
         <td>${res.data[i].dateofbirth}</td>
         <td><button class="btn btn-primary" data-bs-toggle="modal"
         onclick='editStudent(${res.data[i].id})' data-bs-target="#editModel">Edit</button></td>
         <td><button onclick='deleteStudent(${res.data[i].id})' class="btn btn-danger">Delete</button></td>
         </tr>`;
        }
        tbody.innerHTML = tr;
        loading.innerText = ""

    }

}

getpersonal();

const getTotalCount = async () => {
    let total = document.querySelector( "#total" );
    const res = await database.from( "Personal_Detail" ).select( "*", { count: "exact" } );
    total.innerText = res.data.length;
}

getTotalCount();

const editStudent = async ( id ) => {


    const res = await database.from( "students" ).select( "*" ).eq( "id", id );
    if ( res ) {
        document.getElementById( "id" ).value = res.data[0].id;
        document.getElementById( "edit-name" ).value = res.data[0].name;
        document.getElementById( "edit-age" ).value = res.data[0].age;
        document.getElementById( "edit-country" ).value = res.data[0].country;
    }
}

const update = document.getElementById( "update" );

update.addEventListener( "click", async () => {
    let id = document.getElementById( "id" ).value;
    let name = document.getElementById( "edit-name" ).value
    let age = document.getElementById( "edit-age" ).value;
    let country = document.getElementById( "edit-country" ).value;
    update.innerText = "Updateing...."
    update.setAttribute( "disabled", true );
    const res = await database.from( "students" ).update( {
        name, age, country
    } ).eq( "id", id )

    if ( res ) {
        alert( "Student Update Successfully" )
        update.innerText = "Update"
        update.setAttribute( "disabled", false );
        name = "";
        age = "";
        country = "";
        getStudent();
        getTotalCount();

    } else {
        alert( "Student Not Update Successfully" )
        update.innerText = "Update"
        update.setAttribute( "disabled", false );
    }
} )


const deleteStudent = async ( id ) => {
    const res = await database.from( "students" ).delete().eq( "id", id )

    if ( res ) {
        alert( "Delete successfully" )
        getStudent();
        getTotalCount();

    } else {
        alert( "Delete successfully" )
    }
}

const checkCheckbox = async () => {
    var checkbox = document.getElementById( "myCheckbox" );
    if ( checkbox.checked ) {
        checkbox.value = 1;
        console.log( "Checkbox value set to 1." );
    } else {
        checkbox.value = 0;
        console.log( "Checkbox value set to 0." );
    }
}

const checkCheckbox1 = async () => {
    var checkbox = document.getElementById( "myCheckbox1" );
    if ( checkbox.checked ) {
        checkbox.value = 1;
        console.log( "Checkbox value set to 1." );
    } else {
        checkbox.value = 0;
        console.log( "Checkbox value set to 0." );
    }
}

const checkCheckbox2 = async () => {
    var checkbox = document.getElementById( "myCheckbox2" );
    if ( checkbox.checked ) {
        checkbox.value = 1;
        console.log( "Checkbox value set to 1." );
    } else {
        checkbox.value = 0;
        console.log( "Checkbox value set to 0." );
    }
}

const checkCheckbox3 = async () => {
    var checkbox = document.getElementById( "myCheckbox3" );
    if ( checkbox.checked ) {
        checkbox.value = 1;
        console.log( "Checkbox value set to 1." );
    } else {
        checkbox.value = 0;
        console.log( "Checkbox value set to 0." );
    }
}


