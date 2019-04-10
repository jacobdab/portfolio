//Site

AOS.init();

//Hamburger menu
window.onload = ()=>{
$('.hamburger').css('height',window.screen.height - 55.67)
};

$('#hamButton').click(()=>{
    $('html').toggleClass('nomove')
});

$('#fb').click(function(){
    window.location = $(this).data("location");
    return false;
});

$('#insta').click(function(){
    window.location = $(this).data("location");
    return false;
});



//Search
$("[data-toggle='toggle']").click(function () {
    var selector = $(this).data("target");
    $(selector).toggleClass('in');
    $('#inputClient').val('');
    $('#searchItem').fadeOut();
});
let showClient = function (arg) {
    let value = arg.trim();
    if (value == "" || value.length <= 0) {
        $('#searchItem').fadeOut();
        return;
    } else {
        $('#searchItem').fadeIn();
    }
    ;
    let jqxhr = $.get('/search?q=' + value, (data) => {
        $('#searchItem').html('');
    })
        .done((data) => {
            if (data.length === 0) {
                $('#searchItem').append("<p class='text-center mt-2'>Brak wyników</p>");
            } else {
                data.forEach(dataE => {
                    $('#searchItem').append("<a href='#' class='search-query w-100'><p class='m-0 border-bottom fontSmall'>" + dataE.shortDescription + "</p></a>")
                    $('#searchItem a').attr('href', "/devices/" + dataE._id + "/addDevice")
                });
            }
        })
        .fail((err) => {
            console.log(err);
        });
};




$(function () {
    $(document).click(function (event) {
        $('.multi-collapse').collapse('hide');
    });
});
//Collapse
$(document).ready(function(){
    $(".dropdown").hover(
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');
        }
    );
});




$(document).ready(function () {
    $(document).ready(function () {
        $('.ajax-form').submit(function (event) {
            event.preventDefault();
            $.ajax({
                url: '/clientSelfAdd',
                method: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    clientName: $('.clientName').val(),
                    address: $('.address').val(),
                    contact: $('.contact').val(),
                    email: $('.email').val(),
                    nip: $('.nip').val()
                })
            }).done(function (res) {
                if (res.success) {
                    $('.fadeOutAnim').fadeOut("fast", function () {
                        $(".fadeOutAnim").attr("style", "display: none !important");
                    });
                    $('.loader').addClass('d-flex');
                    $('.text').addClass('hide');
                    setTimeout(() => {
                        $('.loader').removeClass('d-flex');
                        $('.text').removeClass('hide');
                        $('.form-box1').addClass('hide');
                        $('.changeSize').removeClass('col-lg-6');
                        $('.changeSize').addClass('col-lg-12');
                        $('.form-box2').removeClass('hide');
                        $('.form-box2').addClass('d-flex');
                    }, 1500);
                } else {
                    console.log('error...ajax');
                }
            });
        });
    });
});


//Shop
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        navText: [$('.am-next'), $('.am-prev')],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav: true,
                loop: true
            }
        }
    })
});

$('.modalAdd').click((e) => {
    e.preventDefault();
    if ($('#ModalAddProduct').css('display', 'block')) {
        $('#ModalAddProduct').addClass('hide');
        $('#ModalAddColor').removeClass('hide');
    } else {
        $('#ModalAddProduct').removeClass('hide');
    }

    //$('#ModalAddParametr').fadeIn();
});
$('.modalParametrSave').click((e) => {
    $.ajax({
        url: '/shop/addParametr/',
        method: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            hdd: $('#hdd').val(),
            size: $('#size').val(),
            res: $('#res').val(),
            color: $('#color').val(),
            ram: $('#ram').val(),
            conn: $('#connection').val(),
            caseW: $('#caseW').val(),
            colorBands: $('#colorBands').val(),
        })
    })
});
$('#remove').click((e) => {
    e.preventDefault()
    let id = $('#remove').attr('href');
    $.ajax({
        url: '/remove-from-cart/'+id,
        method: 'put',
        success: location.reload()
    });
});


$('#ModalAddColor,#ModalAddHDD,#ModalAddConn,#ModalAddRam,#ModalAddRes,#ModalAddSize,#ModalAddCase,#ModalAddColorBands').click((e) => {
    setTimeout(function () {
        if ($('#ModalAddColor,#ModalAddHDD,#ModalAddConn,#ModalAddRam,#ModalAddRes,#ModalAddSize,#ModalAddCase,#ModalAddColorBands').hasClass('show')) {
        } else {
            $("#hdd,#ram,#res,#connection,#color,#size,#case,#colorBands").val('');
            if ($('#ModalAddProduct').hasClass('hide')) {
                $('#ModalAddProduct').removeClass('hide');
                $('#ModalAddColor').addClass('hide');
            } else {
                $('#ModalAddProduct').addClass('hide');
                $('#ModalAddColor').removeClass('hide');
            }
        }
    }, 200);
});

$(document).on('click', '.filter', async (e) => {
    let loc = location.href;
    e.stopPropagation();
    loc = decodeURI(loc);
    let clicked = $(e.target);
    console.log(clicked);
    let data = "";
    e.preventDefault();
    let href = clicked.attr('href');
    console.log(href);
    if (loc.indexOf(href) === -1) {
        if (loc.indexOf("?") === -1)
            loc += "?";
        else
            loc += "&";
        data = loc + clicked.attr('href');
        window.history.pushState("Filter", "Filter", data);
        $.ajax({
            url: data,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: () => {
                clicked.addClass('disabled');
                $('.reload').load(encodeURI(data) + " .reload>*", "");
            }
        })
    } else {
        let index = loc.indexOf(href);
        let dataOut = loc.replace((loc.substring((index - 1), (index - 1) + (href.length + 1))), '');
        window.history.pushState("Filter", "Filter", dataOut);

        if (dataOut.indexOf("?") === -1) {
            console.log(dataOut.indexOf('?'));
            console.log(dataOut);
            let lastReplace = dataOut.replace('&', '?');
            window.history.pushState("Filter", "Filter", lastReplace);
            $.ajax({
                url: data,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                success: () => {
                    clicked.addClass('disabled');
                    $('.reload').load(encodeURI(data) + " .reload>*", "");
                }
            })
        } else {
            window.history.pushState("Filter", "Filter", dataOut);
            $.ajax({
                url: data,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                success: () => {
                    clicked.addClass('disabled');
                    $('.reload').load(encodeURI(data) + " .reload>*", "");
                }
            })
        }
    }
});

