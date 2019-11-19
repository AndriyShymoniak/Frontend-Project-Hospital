$(document).ready(function(){

    var globalSearchOption1Var = '';
    var globalSearchOption2Var = '';

    /**
     * Для вибору у пошуковому меню
     */
    $('.searchOption1').change(function(){
        $('.searchOption2').prop('selectedIndex', 0); //ощищаем select с моделями при каждом изменении select'а с марками
        var entity = $(this).val(); //получаем value выбранной марки
        if(entity != '') { //проверяем, выбрана ли хоть какая-то марка
            $('.searchOption2').attr('disabled',false); //открываем select с моделями
            $('.searchOption2 option').css('display','none'); //сначала скрываем все модели
            $('.searchOption2 option.'+entity).css('display','inline'); //затем открываем те, которые нам нужны
        }
        else {
            $('.searchOption2').attr('disabled',true); //если не выбрана ни одна марка, скрываем select с моделями
        }
    });

// ________________________________________________________________________________________________________________________
    /**
     * Для діставання інфоомації з запитів сервера
     */
    showAllDoctors();
    setTimeout(()=>{
        $('#mainTableBody').pageMe({pagerSelector:'#paginationPager',showPrevNext:true,hidePageNumbers:false,perPage:8});
    },200)

    $('#searchButton').on('click', function (e){
        globalSearchOption1Var = $('.searchOption1').val();
        globalSearchOption2Var = $('.searchOption2').val();
        if (globalSearchOption1Var == '' || globalSearchOption2Var == ''){
            alert("Помилка!");
        } else {
            if (globalSearchOption1Var == 'doctor'){
                if (globalSearchOption2Var == 'DocShowAll'){
                    showAllDoctors();
                } else if (globalSearchOption2Var == 'DocShowById'){
                    showDoctorById();
                }
            } else if (globalSearchOption1Var == 'patient'){
                if (globalSearchOption2Var == 'PatShowAll'){
                    showAllPatients();
                } else if (globalSearchOption2Var == 'PatShowByLastName'){
                    showAllPatientsByLastName();
                // } else if (globalSearchOption2Var == 'PatShowByDocId'){
                //     showAllPatientsByDoctorId();
                } else if (globalSearchOption2Var == 'PatShowById'){
                    showPatientById();
                }
            } else if (globalSearchOption1Var == 'diagnosis'){
                if (globalSearchOption2Var == 'DiagShowAll'){
                    showAllDiagnosis();
                    setTimeout(()=>{
                        $('#mainTableBody').pageMe({pagerSelector:'#paginationPager',showPrevNext:true,hidePageNumbers:false,perPage:8});
                    },2000)
                } else if (globalSearchOption2Var == 'DiagShowAllByDocId'){
                    showDiagnosisByDoctorId();
                } else if (globalSearchOption2Var == 'DiagShowAllByPatId'){
                    showDiagnosisByPatientId();
                } else if (globalSearchOption2Var == 'DiagShowById'){
                    showDiagnosisById();
                }
            } else if (globalSearchOption1Var == 'medicine'){
                if (globalSearchOption2Var == 'MedShowAll'){
                    showAllMedicine();
                } else if (globalSearchOption2Var == 'MedShowById'){
                    showMedicineById();
                }
                else if (globalSearchOption2Var == 'MedShowAnalogById'){
                    showAnalogMedicineById();
                }
            }
        }

        setTimeout(()=>{
            $('#mainTableBody').pageMe({pagerSelector:'#paginationPager',showPrevNext:true,hidePageNumbers:false,perPage:8});
        },200)
    });
    // alert(document.querySelector('#searchBarText').value);

    /* Doctor */
    function showAllDoctors(){
        $.ajax({
            url: serverUrl + 'doctor',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                var Table = document.getElementById("mainDataTable");
                Table.innerHTML = "";
                console.log(response);
                fillTableHeadForDoctor();
                $.each(response, function(key, value){
                    fillTableBodyForDoctor(value);
                });
            }, error: function (error) {
                console.log("Error: " + error)
                if (data.status == 404) {
                    console.log('Error occurred');
                }
            }
        })
    }
    function showDoctorById(){
        if (isNaN(document.querySelector('#searchBarText').value)
                || document.querySelector('#searchBarText').value == ''
                || document.querySelector('#searchBarText').value <= 0){
            alert("Помилка! Введіть ID номер лікаря.")
        } else {
            $.ajax({
                url: serverUrl + 'doctor/id/' + document.querySelector('#searchBarText').value,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    var Table = document.getElementById("mainDataTable");
                    Table.innerHTML = "";
                    console.log(response);
                    fillTableHeadForDoctor();
                    fillTableBodyForDoctor(response);
                }, error: function(error){
                console.log("Error: " + error);
                alert('Не існує лікаря з ID=' + document.querySelector('#searchBarText').value);
                }
            })
        }
    }
    /* Patient */
    function showAllPatients(){
        $.ajax({
            url: serverUrl + 'patient',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                var Table = document.getElementById("mainDataTable");
                Table.innerHTML = "";
                console.log(response);
                fillTableHeadForPatient();
                $.each(response, function(key, value){
                    fillTableBodyForPatient(value);
                });
            }, error: function (error) {
                console.log("Error: " + error)
                if (data.status == 404) {
                    console.log('Error occurred');
                }
            }
        })
    }
    function showAllPatientsByLastName(){
        if (!isNaN(document.querySelector('#searchBarText').value)
            || document.querySelector('#searchBarText').value == ''){
            alert("Помилка! Введіть прізвище пацієнта.")
        } else {
            $.ajax({
                url: serverUrl + 'patient/lastName/' +  encodeURIComponent(document.querySelector('#searchBarText').value),
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    console.log(encodeURIComponent(document.querySelector('#searchBarText').value));
                    console.log(serverUrl + 'patient/lastName/' + document.querySelector('#searchBarText').value);
                    console.log(response);
                    var Table = document.getElementById("mainDataTable");
                    Table.innerHTML = "";
                    console.log(response);
                    fillTableHeadForPatient();
                    $.each(response, function(key, value){
                        fillTableBodyForPatient(value);
                    });
                }, error: function (error) {
                    console.log("Error: " + error)
                    if (data.status == 404) {
                        console.log('Error occurred');
                    }
                }
            })
        }
    }
    // TODO: доробити
    // function showAllPatientsByDoctorId(){
    // }
    function showPatientById(){
        if (isNaN(document.querySelector('#searchBarText').value)
            || document.querySelector('#searchBarText').value == ''
            || document.querySelector('#searchBarText').value <= 0){
            alert("Помилка! Введіть ID номер лікаря.")
        } else {
            $.ajax({
                url: serverUrl + 'patient/id/' + document.querySelector('#searchBarText').value,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    var Table = document.getElementById("mainDataTable");
                    Table.innerHTML = "";
                    console.log(response);
                    fillTableHeadForPatient();
                    fillTableBodyForPatient(response);
                }, error: function(error){
                    console.log("Error: " + error);
                    alert('Не існує лікаря з ID=' + document.querySelector('#searchBarText').value);
                }
            })
        }
    }
    /* Diagnosis */
    function showAllDiagnosis(){
        $.ajax({
            url: serverUrl + 'diagnosis',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                var Table = document.getElementById("mainDataTable");
                Table.innerHTML = "";
                console.log(response);
                fillTableHeadForDiagnosis();
                $.each(response, function(key, value){
                    fillTableBodyForDiagnosis(value);
                });
            }, error: function (error) {
                console.log("Error: " + error)
                if (data.status == 404) {
                    console.log('Error occurred');
                }
            }
        })
    }
    function showDiagnosisByDoctorId(){
        if (isNaN(document.querySelector('#searchBarText').value)
            || document.querySelector('#searchBarText').value == ''
            || document.querySelector('#searchBarText').value <= 0){
            alert("Помилка! Введіть ID номер діагнозу.")
        } else {
            $.ajax({
                url: serverUrl + 'diagnosis/docId/' + document.querySelector('#searchBarText').value,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    var Table = document.getElementById("mainDataTable");
                    Table.innerHTML = "";
                    console.log(response);
                    fillTableHeadForDiagnosis();
                    $.each(response, function(key, value){
                        fillTableBodyForDiagnosis(value);
                    });
                }, error: function (error) {
                    console.log("Error: " + error)
                    if (data.status == 404) {
                        console.log('Error occurred');
                    }
                }
            })
        }
    }
    function showDiagnosisByPatientId(){
        if (isNaN(document.querySelector('#searchBarText').value)
            || document.querySelector('#searchBarText').value == ''
            || document.querySelector('#searchBarText').value <= 0){
            alert("Помилка! Введіть ID номер діагнозу.")
        } else {
            $.ajax({
                url: serverUrl + 'diagnosis/patId/' + document.querySelector('#searchBarText').value,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    var Table = document.getElementById("mainDataTable");
                    Table.innerHTML = "";
                    console.log(response);
                    fillTableHeadForDiagnosis();
                    $.each(response, function(key, value){
                        fillTableBodyForDiagnosis(value);
                    });
                }, error: function (error) {
                    console.log("Error: " + error)
                    if (data.status == 404) {
                        console.log('Error occurred');
                    }
                }
            })
        }
    }
    function showDiagnosisById(){
        if (isNaN(document.querySelector('#searchBarText').value)
            || document.querySelector('#searchBarText').value == ''
            || document.querySelector('#searchBarText').value <= 0){
            alert("Помилка! Введіть ID номер діагнозу.")
        } else {
            $.ajax({
                url: serverUrl + 'diagnosis/id/' + document.querySelector('#searchBarText').value,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    var Table = document.getElementById("mainDataTable");
                    Table.innerHTML = "";
                    console.log(response);
                    fillTableHeadForDiagnosis();
                    fillTableBodyForDiagnosis(response);
                }, error: function(error){
                    console.log("Error: " + error);
                    alert('Не існує діагнозу з ID=' + document.querySelector('#searchBarText').value);
                }
            })
        }
    }
    /* Medicine */
    function showAllMedicine(){
        $.ajax({
            url: serverUrl + 'medicine',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                var Table = document.getElementById("mainDataTable");
                Table.innerHTML = "";
                console.log(response);
                fillTableHeadForMedicine();
                $.each(response, function(key, value){
                    fillTableBodyForMedicine(value);
                });
            }, error: function (error) {
                console.log("Error: " + error)
                if (data.status == 404) {
                    console.log('Error occurred');
                }
            }
        })
    }
    function showMedicineById(){
        if (isNaN(document.querySelector('#searchBarText').value)
            || document.querySelector('#searchBarText').value == ''
            || document.querySelector('#searchBarText').value <= 0){
            alert("Помилка! Введіть ID номер ліків.")
        } else {
            $.ajax({
                url: serverUrl + 'medicine/id/' + document.querySelector('#searchBarText').value,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    var Table = document.getElementById("mainDataTable");
                    Table.innerHTML = "";
                    console.log(response);
                    fillTableHeadForMedicine();
                    fillTableBodyForMedicine(response);
                }, error: function(error){
                    console.log("Error: " + error);
                    alert('Не існує ліків з ID=' + document.querySelector('#searchBarText').value);
                }
            })
        }
    }
    function showAnalogMedicineById(){
        if (isNaN(document.querySelector('#searchBarText').value)
            || document.querySelector('#searchBarText').value == ''
            || document.querySelector('#searchBarText').value <= 0){
            alert("Помилка! Введіть ID номер ліків.")
        } else {
            $.ajax({
                url: serverUrl + 'medicine/analogId/' + document.querySelector('#searchBarText').value,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    var Table = document.getElementById("mainDataTable");
                    Table.innerHTML = "";
                    console.log(response);
                    fillTableHeadForMedicine();
                    $.each(response, function(key, value){
                        fillTableBodyForMedicine(value);
                    });
                }, error: function (error) {
                    console.log("Error: " + error)
                    if (data.status == 404) {
                        console.log('Error occurred');
                    }
                }
            })
        }
    }

    function fillTableHeadForDoctor(){
        $('#mainDataTable').append(
            `
                    <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">ПІБ</th>
                                <th scope="col">Спеціальність</th>
                                <th scope="col">Номер телефону</th>
                                <th scope="col">Електронна адреса</th>
                                <th scope="col">Дата народження</th>
                            </tr>
                    </thead>
                    `
        )
    }
    function fillTableBodyForDoctor(value){
        var date = new Date(value.birthDate);
        var tempDate = date.getDate();
        if (tempDate < 10) tempDate = '0' + tempDate;
        var tempMonth = date.getMonth();
        if (tempMonth < 10) tempMonth = '0' + tempMonth;
        var formatedDate = tempDate + '/' + tempMonth + '/' + date.getFullYear();
        var initials = value.lastName + ' ' + value.firstName.toString().charAt(0) + '.' + value.middleName.toString().charAt(0) + '.';
        $('#mainDataTable').append(
            `
                        <tbody id="mainTableBody">
                        </tbody>    
            `
        )
        $('#mainTableBody').append(
            `
                             <tr>
                                <th scope="row">${value.doctorId}</th>
                                <td>
                                    <a href="doctor_page.html?doctor_id=${value.doctorId}">${initials}</a>
                                </td>
                                <td>${value.speciality}</td>
                                <td>${value.phoneNumber}</td>
                                <td>${value.emailAddress}</td>
                                <td>${formatedDate}</td>
                            </tr>
            `
        )
    }
    function fillTableHeadForPatient(){
        $('#mainDataTable').append(
            `
                    <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">ПІБ</th>
                                <th scope="col">Адреса</th>
                                <th scope="col">Номер телефону</th>
                                <th scope="col">Електронна адреса</th>
                                <th scope="col">Дата народження</th>
                            </tr>
                    </thead>
                    `
        )
    }
    function fillTableBodyForPatient(value){
        var date = new Date(value.birthDate);
        var tempDate = date.getDate();
        if (tempDate < 10) tempDate = '0' + tempDate;
        var tempMonth = date.getMonth();
        if (tempMonth < 10) tempMonth = '0' + tempMonth;
        var formatedDate = tempDate + '/' + tempMonth + '/' + date.getFullYear();
        var initials = value.lastName + ' ' + value.firstName.toString().charAt(0) + '.' + value.middleName.toString().charAt(0) + '.';
        $('#mainDataTable').append(
            `
                        <tbody id="mainTableBody">
                        </tbody>    
             `
        )
        $('#mainTableBody').append(
            `
                        <tr>
                         <th scope="row">${value.patientId}</th>
                         <td>
                           <a href="patient_page.html?patient_id=${value.patientId}">${initials}</a>
                          </td>
                         <td>${value.address}</td>
                         <td>${value.phoneNumber}</td>
                         <td>${value.emailAddress}</td>
                         <td>${formatedDate}</td>
                        </tr> 
            `
        )
    }
    function fillTableHeadForDiagnosis(){
        $('#mainDataTable').append(
            `
                    <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Діагноз</th>
                                <th scope="col">Дата(год, день/міс/рік)</th>
                                <th scope="col">Пацієнт</th>
                                <th scope="col">Лікар</th>
                            </tr>
                    </thead>
                    `
        )
    }
    function fillTableBodyForDiagnosis(value){
        var date = new Date(value.diagnosisDate);
        var tempMinutes = date.getMinutes();
        console.log(tempMinutes.length);
        if (tempMinutes < 10) tempMinutes = '0' + tempMinutes;
        var tempHours = date.getHours();
        if (tempHours < 10) tempHours = '0' + tempHours;
        var tempDate = date.getDate();
        if (tempDate < 10) tempDate = '0' + tempDate;
        var tempMonth = date.getMonth();
        if (tempMonth < 10) tempMonth = '0' + tempMonth;
        var formatedDate = tempHours+ ':' + tempMinutes + ', ' + tempDate + '/' + tempMonth + '/' + date.getFullYear();
        var docInitials = value.doctor.lastName + ' ' + value.doctor.firstName.toString().charAt(0) + '.' + value.doctor.middleName.toString().charAt(0) + '.';
        var patInitials = value.patient.lastName + ' ' + value.patient.firstName.toString().charAt(0) + '.' + value.patient.middleName.toString().charAt(0) + '.';;
        $('#mainDataTable').append(
            `
                        <tbody id="mainTableBody">
                        </tbody>    
                        `
        )
        $('#mainTableBody').append(
            `
                        <tr>
                         <th scope="row">${value.diagnosisId}</th>
                         <td>
                          <a href="diagnosis_page.html?diagnosis_id=${value.diagnosisId}">${value.name}</a>
                          </td>
                         <td>${formatedDate}</td>
                         <td>${patInitials}</td>
                         <td>${docInitials}</td>
                        </tr>  
            `
        )
    }
    function fillTableHeadForMedicine(){
        $('#mainDataTable').append(
            `
                    <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Назва</th>
                                <th scope="col">Ціна</th>
                            </tr>
                    </thead>
                    `
        )
    }
    function fillTableBodyForMedicine(value){
        var price = value.price + " грн";
        $('#mainDataTable').append(
            `
                        <tbody id="mainTableBody">
                        </tbody>    
                        `
        )
        $('#mainTableBody').append(
            `
                         <tr>
                          <th scope="row">${value.medicineId}</th>
                          <td>${value.name}</td>
                          <td>${price}</td>
                         </tr>
            `
        )
    }

// ________________________________________________________________________________________________________________________
    /**
     * Для заповнення таблиці даними
     */

    // $('#mainDataTable').append(
    //     `
    //     <thead>
    //             <tr>
    //                 <th scope="col">№</th>
    //                 <th scope="col">Дата</th>
    //                 <th scope="col">Діагноз</th>
    //                 <th scope="col">Пацієнт</th>
    //                 <th scope="col">Лікар</th>
    //             </tr>
    //     </thead>
    //     <tbody id="mainTableBody">
    //             <tr>
    //                 <th scope="row">1488</th>
    //                 <td>12:03 14.02.1988</td>
    //                 <td>СПІД сракі</td>
    //                 <td>Жмишенко В.А.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1488</th>
    //                 <td>12:03 14.02.1988</td>
    //                 <td>СПІД сракі</td>
    //                 <td>Жмишенко В.А.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1488</th>
    //                 <td>12:03 14.02.1988</td>
    //                 <td>СПІД сракі</td>
    //                 <td>Жмишенко В.А.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1489</th>
    //                 <td>13:03 14.02.1988</td>
    //                 <td>Чума підшлункової</td>
    //                 <td>Радрігєс Я.С.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1488</th>
    //                 <td>12:03 14.02.1988</td>
    //                 <td>СПІД сракі</td>
    //                 <td>Жмишенко В.А.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1489</th>
    //                 <td>13:03 14.02.1988</td>
    //                 <td>Чума підшлункової</td>
    //                 <td>Радрігєс Я.С.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1489</th>
    //                 <td>13:03 14.02.1988</td>
    //                 <td>Чума підшлункової</td>
    //                 <td>Радрігєс Я.С.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1488</th>
    //                 <td>12:03 14.02.1988</td>
    //                 <td>СПІД сракі</td>
    //                 <td>Жмишенко В.А.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1489</th>
    //                 <td>13:03 14.02.1988</td>
    //                 <td>Чума підшлункової</td>
    //                 <td>Радрігєс Я.С.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">1488</th>
    //                 <td>12:03 14.02.1988</td>
    //                 <td>СПІД сракі</td>
    //                 <td>Жмишенко В.А.</td>
    //                 <td>Мопс Д.О.</td>
    //             </tr>
    //     </tbody>
    //     `
    // )

});

