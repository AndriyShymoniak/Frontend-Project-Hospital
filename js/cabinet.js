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
                } else if (globalSearchOption2Var == 'PatShowByDocId'){
                    showAllPatientsByDoctorId();
                } else if (globalSearchOption2Var == 'PatShowById'){
                    showPatientById();
                }
            } else if (globalSearchOption1Var == 'diagnosis'){
                if (globalSearchOption2Var == 'DiagShowAll'){
                    showAllDiagnosis();
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

    });
    // alert(document.querySelector('#searchBarText').value);

    // Doctor
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
                $('#mainDataTable').append(
                    `
                    <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">ПІБ</th>
                                <th scope="col">Номер телефону</th>
                                <th scope="col">Електронна адреса</th>
                                <th scope="col">Спеціальність</th>
                                <th scope="col">Дата народження</th>
                            </tr>
                    </thead>
                    `
                )
                $.each(response, function(key, value){
                    var date = new Date(value.birthDate);
                    var formatedDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
                    console.log(date);
                    console.log(formatedDate);
                    $('#mainDataTable').append(
                        `
                        <tbody id="mainTableBody">
                             <tr>
                                <th scope="row">${value.doctorId}</th>
                                <td>${value.lastName}</td>
                                <td>${value.phoneNumber}</td>
                                <td>${value.emailAddress}</td>
                                <td>${value.speciality}</td>
                                <td>${formatedDate}</td>
                            </tr>
                        </tbody>    
                        `
                    )
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
    }
    // Patient
    function showAllPatients(){
    }
    function showAllPatientsByLastName(){
    }
    function showAllPatientsByDoctorId(){
    }
    function showPatientById(){
    }
    // Diagnosis
    function showAllDiagnosis(){
    }
    function showDiagnosisById(){
    }
    // Medicine
    function showAllMedicine(){
    }
    function showMedicineById(){
    }
    function showAnalogMedicineById(){
    }

    function formatTime(time, prefix = "") {
        return typeof time == "object" ? prefix + time.toLocaleDateString() : "";
    }


// ________________________________________________________________________________________________________________________
    /**
     * Для заповнення таблиці даними
     */

    $('#mainDataTable').append(
        `
        <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Діагноз</th>
                    <th scope="col">Пацієнт</th>
                    <th scope="col">Лікар</th>
                </tr>
        </thead>    
        <tbody id="mainTableBody">
                <tr>
                    <th scope="row">1488</th>
                    <td>12:03 14.02.1988</td>
                    <td>СПІД сракі</td>
                    <td>Жмишенко В.А.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1488</th>
                    <td>12:03 14.02.1988</td>
                    <td>СПІД сракі</td>
                    <td>Жмишенко В.А.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1488</th>
                    <td>12:03 14.02.1988</td>
                    <td>СПІД сракі</td>
                    <td>Жмишенко В.А.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1489</th>
                    <td>13:03 14.02.1988</td>
                    <td>Чума підшлункової</td>
                    <td>Радрігєс Я.С.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1488</th>
                    <td>12:03 14.02.1988</td>
                    <td>СПІД сракі</td>
                    <td>Жмишенко В.А.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1489</th>
                    <td>13:03 14.02.1988</td>
                    <td>Чума підшлункової</td>
                    <td>Радрігєс Я.С.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1489</th>
                    <td>13:03 14.02.1988</td>
                    <td>Чума підшлункової</td>
                    <td>Радрігєс Я.С.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1488</th>
                    <td>12:03 14.02.1988</td>
                    <td>СПІД сракі</td>
                    <td>Жмишенко В.А.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1489</th>
                    <td>13:03 14.02.1988</td>
                    <td>Чума підшлункової</td>
                    <td>Радрігєс Я.С.</td>
                    <td>Мопс Д.О.</td>
                </tr>
                <tr>
                    <th scope="row">1488</th>
                    <td>12:03 14.02.1988</td>
                    <td>СПІД сракі</td>
                    <td>Жмишенко В.А.</td>
                    <td>Мопс Д.О.</td>
                </tr>
        </tbody>
        `
    )

})

