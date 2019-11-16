$(document).ready(function(){

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

    $.ajax({
        url: serverUrl + 'diagnosis',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            alert("OK");
            console.log(response);
        }, error: function (error) {
            console.log("Error: " + error)
            if (data.status == 404) {
                console.log('There is no such movie');
            }
        }
    })

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
        <tbody>
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

