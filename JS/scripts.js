var lpApp = angular.module('lpApp', []);

lpApp.controller('valut', function ($scope, $http) {

    $scope.sortBy = 'Cur_Name';
    $scope.sortRev = false;

    $http.get('http://www.nbrb.by/API/ExRates/Rates?Periodicity=0').then(function (response) {
        $scope.prices = response.data;
        $scope.sortGet;
        
    }, function (response) {
        $scope.requestStatus = response.status;
        $scope.requestStatusText = response.statusText;
    });

    

    $scope.sortSet = function (propertyCureName) {
        if ($scope.sortBy == propertyCureName) {
            $scope.sortRev = !$scope.sortRev;
        }
        $scope.sortBy = propertyCureName;
		localStorage.sortBy = $scope.sortBy;
		localStorage.sortRev = $scope.sortRev;

    }
    $scope.filterByName = function (price) {
        return (price.Cur_Abbreviation === 'USD') || (price.Cur_Abbreviation === 'EUR') || (price.Cur_Abbreviation === 'RUB') || (price.Cur_Abbreviation === 'UAH');
    }

    $scope.sortGet = function () {
        if (localStorage.sortBy && localStorage.sortRev) {
            $scope.sortBy = localStorage.sortBy;
            $scope.sortRev = (localStorage.sortRev == 'true');
        } else {
            $scope.sortBy = 'Cur_Name';
            $scope.sortRev = false;
        }
    }




});


(function ($) {
    $(document).ready(function () {
        function lpHeader() {
            if ($(window).scrollTop() == 0) {
                $('header').addClass('top');
            } else {
                $('header.top').removeClass('top');
            }
        }
        var lpNav = $('header ul');

        lpNav.find('li a').on('click', function (e) {

            var linkTrgt = $($(this).attr('href'));

            if (linkTrgt.length > 0) {
                var dataOffset = 40;
                e.preventDefault();
                if (linkTrgt.attr('data-offset')) {
                    dataOffset = parseInt(linkTrgt.attr('data-offset'));
                }
                var offset = linkTrgt.offset().top;
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: offset - dataOffset
                }, 750);
            }

        });
        
        //
        var serNav = $('.lp-content ul.b1');

        serNav.find('li a').on('click', function (e) {

            var linkTr = $($(this).attr('href'));

            if (linkTr.length > 0) {
                var dataOffset = 44;
                e.preventDefault();
                if (linkTr.attr('data-offset')) {
                    dataOffset = parseInt(linkTr.attr('data-offset'));
                }
                var offset = linkTr.offset().top;
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: offset - dataOffset
                }, 750);
            }

        });
        //

        function lpSetNavActive() {

            var curItem = '';
            $('section').each(function () {
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id');
                }
            });

            if (lpNav.find('li.active a').attr('href') != '#' + curItem ||
                lpNav.find('li.active').length == 0) {
                lpNav.find('li.active').removeClass('active');

                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');

            }

        }

        lpSetNavActive();
        $(window).on('scroll load', lpSetNavActive);


        lpHeader();
        $(window).on('scroll', lpHeader);


        $(".lp-slider1").owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                    loop: false

                },
                800: {
                    items: 2,
                    loop: false
                },
                1200: {
                    items: 2,
                    loop: false
                },

            }


        });

        $('#services button').on('click', function () {
            $(".lp-slider1").trigger('to.owl.carousel', $(this).index());


        });

        var owl = $('.owl-carousel');

        owl.on('initialized.owl.carousel', function () {
            console.log('Слайд установлен');
        });

        $(".lp-slider2").owlCarousel({
            dotsEach: true,
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                740: {
                    items: 2
                },
                1200: {
                    items: 4
                }
            }

        }).on('translated.owl.carousel', function () {
            console.log('Слайд переключен')
        }).on('resize.owl.carousel', function () {
            console.log('Слайд изменил размер');
        });

        $('button.slide').on('click', function () {
            var slide = parseInt($('input.slide').val()) || 1;
            owl.trigger('to.owl.carousel', slide - 1);
        });

        //        Табулятор

        $('.lp-tabs').each(function () {

            var tabs = $(this),
                tabsTitlesNames = [];

            tabs.find('div[data-tab-title]').each(function () {
                tabsTitlesNames.push($(this).attr('data-tab-title'));
            }).addClass('lp-tab');

            tabs.wrapInner('<div class="lp-tabs-content"></div>');

            tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');





            var tabsTitles = tabs.find('.lp-tabs-titles'),
                tabsContent = tabs.find('.lp-tabs-content'),
                tabsContentTabs = tabsContent.find('.lp-tab');

            tabsTitlesNames.forEach(function (value) {
                tabsTitles.find('ul').append('<li>' + value + '</li>');
            });

            var tabsTitlesItems = tabsTitles.find('li');

            tabsTitlesItems.eq(0).addClass('active');

            tabsContentTabs.eq(0).addClass('active').show();

            //Устанавливает высоту

            tabsContent.height(tabsContent.find('.active').outerHeight());

            // Переходы между табами


            tabsTitlesItems.on('click', function () {

                if (!tabs.hasClass('changing')) {

                    tabs.addClass('changing');

                    tabsTitlesItems.removeClass('active');
                    $(this).addClass('active');

                    var curTab = tabsContent.find('.active'),
                        nextTab = tabsContentTabs.eq($(this).index());

                    var curHeight = curTab.outerHeight();

                    nextTab.show();

                    var nextHeight = nextTab.outerHeight();

                    nextTab.hide();

                    if (curHeight < nextHeight) {

                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                    }

                    curTab.fadeOut(500, function () {

                        if (curHeight > nextHeight) {

                            tabsContent.animate({
                                height: nextHeight
                            }, 500);
                        }

                        nextTab.fadeIn(500, function () {
                            curTab.removeClass('active');
                            nextTab.addClass('active');
                            tabs.removeClass('changing');
                        });

                    });
                }




            });

            $(window).on('resize', function () {
                tabsContent.height(tabsContent.find('.active').outerHeight());
            });



        });
        
        
        $('.lp-mfp-inline').magnificPopup({
            type: 'inline'
        });



        $('.lp-mfp-image-1').magnificPopup({
            items: [{
                src: '/IMG/intereor/Sovrem/1.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Sovrem/2.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Sovrem/3.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Sovrem/4.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Sovrem/5.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Sovrem/6.jpg',
                type: 'image'
            }],
            gallery: {
                enabled: true
            }

        });


        $('.lp-mfp-image-2').magnificPopup({
            items: [{
                src: '/IMG/intereor/minimalism/1.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/minimalism/2.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/minimalism/3.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/minimalism/4.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/minimalism/5.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/minimalism/6.jpg',
                type: 'image'
            }],
            gallery: {
                enabled: true
            }

        });


        $('.lp-mfp-image-3').magnificPopup({
            items: [{
                src: '/IMG/intereor/skandinav/1.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/skandinav/2.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/skandinav/3.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/skandinav/4.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/skandinav/5.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/skandinav/6.jpg',
                type: 'image'
            }],
            gallery: {
                enabled: true
            }

        });


        $('.lp-mfp-image-4').magnificPopup({
            items: [{
                src: '/IMG/intereor/Kantry/1.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Kantry/2.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Kantry/3.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Kantry/4.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Kantry/5.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Kantry/6.jpg',
                type: 'image'
            }],
            gallery: {
                enabled: true
            }

        });


        $('.lp-mfp-image-5').magnificPopup({
            items: [{
                src: '/IMG/intereor/Glamyr/1.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Glamyr/2.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Glamyr/3.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Glamyr/4.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Glamyr/5.jpg',
                type: 'image'
            }, {
                src: '/IMG/intereor/Glamyr/6.jpg',
                type: 'image'
            }],
            gallery: {
                enabled: true
            }

        });

        $('#lp-fb1').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: '.lp-fb1-link',
            fbColor: '#7952b3'
        });

        $('#lp-fb2').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: '.lp-fb1-link',
            fbColor: '#7952b3'
        });
        
        $('#lp-fb3').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink:false,
            fbColor: '#7952b3'
        });
        
        
        
        $.fn.lpMapInit = function () {


            var lpMapOptions = {
                center: [53.837009, 27.621001],
                zoom: 16,
                controls: ['fullscreenControl', 'zoomControl']
            }

            if (window.innerWidth < 768) {
                lpMapOptions.behaviors = ['multiTouch']
            } else {
                lpMapOptions.behaviors = ['drag']
            }

            var Map = new ymaps.Map('map', lpMapOptions);
            var lpPlacemark = new ymaps.Placemark(lpMapOptions.center, {
                hintContent: 'Офис интерьер строя',
                balloonContentHeader: 'Офис интерьер строя',
                balloonContentBody: 'Помощь при выборе интерьера дома',
                balloonContentFooter: 'Ул.Уборевича 148'
            });

            Map.geoObjects.add(lpPlacemark);
        }



    });
})(jQuery);
