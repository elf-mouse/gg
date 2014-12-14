jQuery(document).ready(function($) {
    $('.fck2003').hover(function() {
        $('#fck2003-bg').addClass('img-fck2003');
    }, function() {
        $('#fck2003-bg').removeClass('img-fck2003');
    });
    // preload
    $('<img src="10th/10years_main.png"/>');

    $('#slide-1 .img #turkey').hover(function() {
        $(this).stop().animate({
            'background-position': '150px'
        }, 250);
    }, function() {
        $(this).stop().animate({
            'background-position': '20px'
        }, 250);
    });

    /* home page animation */ (function() {

        var startingAnimation = true;

        //config
        var config = {
            $sliderMainBtn: $('#slider-main-btn'),
            $sliderNavi: $('#slider-navi'),
            ifOldIE: $('html').hasClass('lt-ie9') ? true : false,
            basicAnimationSpeed: 350,
            elemAnim: {
                s1: {
                    img: $('#slide-1 .img'),
                    header: $('#slide-1 h2'),
                    headerSpan: $('#slide-1 h2 span'),
                    free: $('#slide-1 .free'),
                    downloads: $('#slide-1 .downloads')
                },
                s2: {
                    header: $('#slide-2 h2').add('#slide-2 h2 span'),
                    para: $('#slide-2 p'),
                    list: $('#slide-2 .std'),
                    p1: $('#slide-2 .img li:eq(0)'),
                    p2: $('#slide-2 .img li:eq(1)'),
                    p3: $('#slide-2 .img li:eq(2)'),
                    p4: $('#slide-2 .img li:eq(3)'),
                    p5: $('#slide-2 .img li:eq(4)'),
                    p6: $('#slide-2 .img li:eq(5)')
                },
                s3: {
                    header: $('#slide-3 h2').add('#slide-3 h2 span'),
                    para: $('#slide-3 p'),
                    list: $('#slide-3 .std'),
                    img: $('#slide-3 .img')
                },
                s4: {
                    header: $('#slide-4 h2').add('#slide-4 h2 span'),
                    para: $('#slide-4 p'),
                    list: $('#slide-4 .std'),
                    img: $('#slide-4 .img')
                },
                s5: {
                    header: $('#slide-5 h2').add('#slide-5 h2 span'),
                    para: $('#slide-5 p'),
                    list: $('#slide-5 .std'),
                    img: $('#slide-5 .img'),
                    opts: $('#slide-5 .opts')
                }
            },
            setOpacity: function() {
                $('#slides-box > li > *, #slides-box h2 span').removeAttr('style').css({
                    opacity: 0
                }); //for ie8 and ie7 - problems with native filters
                $('#slide-2').find('.img li').removeAttr('style').css({
                    opacity: 0
                }).end().find('.img').css({
                    opacity: 1
                });
            },
            replaceMainBtn: function() {
                if (this.ifOldIE) {
                    $('> span', this.$sliderMainBtn).css({
                        'z-index': 8,
                        'display': 'none'
                    });
                    $('a', this.$sliderMainBtn).css({
                        'z-index': 9,
                        'display': 'block'
                    });
                } else {
                    $('> span', this.$sliderMainBtn).animate({
                        opacity: 0
                    }, {
                        queue: false,
                        duration: 300,
                        complete: function() {
                            $(this).css('z-index', 8);
                        }
                    });
                    $('a', this.$sliderMainBtn).animate({
                        opacity: 1
                    }, {
                        queue: false,
                        duration: 300,
                        complete: function() {
                            $(this).css('z-index', 9);
                        }
                    });
                }
            },
            animateCommonElements: function($header, $para, $list, reverse) {
                if (!$header.is(':animated')) {
                    $header.animate({
                        opacity: reverse ? 0 : 1,
                        right: reverse ? '-20px' : 0
                    }, {
                        queue: false,
                        duration: 200
                    });
                }
                if (!$para.is(':animated')) {
                    $para.animate({
                        opacity: reverse ? 0 : 1,
                        right: reverse ? '-20px' : 0
                    }, {
                        queue: false,
                        duration: 300
                    });
                }
                if (!$list.is(':animated')) {
                    $list.animate({
                        opacity: reverse ? 0 : 1,
                        right: reverse ? '-20px' : 0
                    }, {
                        queue: false,
                        duration: 400
                    });
                }
            },
            animSlide1: function() {

                $('#slide-1').addClass('active');

                if (!startingAnimation) {
                    config.replaceMainBtn();
                    $('a span', config.$sliderMainBtn).animate({
                        opacity: 0
                    }, 200, function() {
                        $(this).html("Find out why").animate({
                            opacity: 1
                        }, {
                            queue: false,
                            duration: config.basicAnimationSpeed
                        });
                    });
                }

                config.elemAnim.s1.img.animate({
                    opacity: 1,
                    top: 0
                }, {
                    queue: false,
                    duration: config.basicAnimationSpeed,
                    step: function(now, fx) {
                        if (fx.state > 0.1) {
                            if (!config.elemAnim.s1.header.is(':animated')) {
                                config.elemAnim.s1.header.add(config.elemAnim.s1.headerSpan).animate({
                                    opacity: 1,
                                    top: 0
                                }, {
                                    queue: false,
                                    duration: config.basicAnimationSpeed,
                                    complete: function() {
                                        config.elemAnim.s1.free.animate({
                                            opacity: 1,
                                            left: 0
                                        }, {
                                            queue: false,
                                            duration: config.basicAnimationSpeed
                                        });
                                        config.elemAnim.s1.downloads.animate({
                                            opacity: 1,
                                            right: 0
                                        }, {
                                            queue: false,
                                            duration: config.basicAnimationSpeed,
                                            complete: function() {
                                                if (startingAnimation) {
                                                    if (config.ifOldIE) {
                                                        $('a', config.$sliderMainBtn).css('display', 'block');
                                                    } else {
                                                        $('a', config.$sliderMainBtn).animate({
                                                            opacity: 1
                                                        }, {
                                                            queue: false,
                                                            duration: 500
                                                        });
                                                    }
                                                    config.$sliderMainBtn.animate({
                                                        bottom: '27px'
                                                    }, 500);
                                                    startingAnimation = false;
                                                }
                                            }
                                        })
                                    }
                                });
                            }
                        }
                    }
                });
            },
            animSlide2: function() {
                var baseSpeed = 50;
                $('#slide-2').addClass('active');
                $('a', config.$sliderMainBtn).attr('href', $('#slide-2 .more').attr('href'));
                config.replaceMainBtn();

                $('a span', config.$sliderMainBtn).animate({
                    opacity: 0
                }, 200, function() {
                    $(this).html("Read on").animate({
                        opacity: 1
                    }, {
                        queue: false,
                        duration: config.basicAnimationSpeed
                    });
                    config.$sliderNavi.animate({
                        opacity: 1
                    }, {
                        queue: false,
                        duration: 100
                    })
                        .animate({
                        bottom: 90 + 'px'
                    }, 100, function() {
                        config.elemAnim.s2.p1.animate({
                            opacity: 1,
                            left: 0
                        }, {
                            queue: false,
                            duration: baseSpeed
                        });
                        config.elemAnim.s2.p2.animate({
                            opacity: 1,
                            left: 0
                        }, {
                            queue: false,
                            duration: baseSpeed + 150
                        });
                        config.elemAnim.s2.p3.animate({
                            opacity: 1,
                            left: 0
                        }, {
                            queue: false,
                            duration: baseSpeed + 300
                        });
                        config.elemAnim.s2.p4.animate({
                            opacity: 1,
                            left: 0
                        }, {
                            queue: false,
                            duration: baseSpeed + 450
                        });
                        config.elemAnim.s2.p5.animate({
                            opacity: 1,
                            left: 0
                        }, {
                            queue: false,
                            duration: baseSpeed + 600
                        });
                        config.elemAnim.s2.p6.animate({
                            opacity: 1,
                            left: 0
                        }, {
                            queue: false,
                            duration: baseSpeed + 750,
                            step: function(now, fx) {
                                if (fx.state > 0.2) {
                                    config.animateCommonElements(config.elemAnim.s2.header, config.elemAnim.s2.para, config.elemAnim.s2.list, false);
                                }
                            }
                        })
                    });
                });
            },
            animSlide3: function($whichSlide) {
                $('#slide-3').addClass('active');
                $('a', config.$sliderMainBtn).attr('href', $('#slide-3 .more').attr('href'));
                config.replaceMainBtn();
                $('a span', config.$sliderMainBtn).animate({
                    opacity: 0
                }, 0, function() {
                    $(this).html("Read on").animate({
                        opacity: 1
                    }, {
                        queue: false,
                        duration: config.basicAnimationSpeed
                    });
                    config.elemAnim.s3.img.animate({
                        opacity: 1,
                        left: 0
                    }, {
                        queue: false,
                        duration: config.basicAnimationSpeed,
                        step: function(now, fx) {
                            if (fx.state > 0.2) {
                                config.animateCommonElements(config.elemAnim.s3.header, config.elemAnim.s3.para, config.elemAnim.s3.list, false);
                            }
                        }
                    });
                });
            },
            animSlide4: function() {
                $('#slide-4').addClass('active');
                $('a', config.$sliderMainBtn).attr('href', $('#slide-4 .more').attr('href'));
                config.replaceMainBtn();
                $('a span', config.$sliderMainBtn).animate({
                    opacity: 0
                }, 0, function() {
                    $(this).html("Read on").animate({
                        opacity: 1
                    }, {
                        queue: false,
                        duration: config.basicAnimationSpeed
                    });
                    config.elemAnim.s4.img.animate({
                        opacity: 1,
                        left: 0
                    }, {
                        queue: false,
                        duration: config.basicAnimationSpeed,
                        step: function(now, fx) {
                            if (fx.state > 0.2) {
                                config.animateCommonElements(config.elemAnim.s4.header, config.elemAnim.s4.para, config.elemAnim.s4.list, false);
                            }
                        }
                    });
                });
            },
            animSlide5: function() {
                $('#slide-5').addClass('active');
                if (config.ifOldIE) {
                    $('a', config.$sliderMainBtn).css({
                        'z-index': 8,
                        'display': 'none'
                    });
                    $('span', config.$sliderMainBtn).css({
                        'z-index': 9,
                        'display': 'block'
                    });
                } else {
                    $('a', config.$sliderMainBtn).animate({
                        opacity: 0
                    }, 300, function() {
                        $(this).css('z-index', 8);
                    });
                    $('span', config.$sliderMainBtn).animate({
                        opacity: 1
                    }, 300, function() {
                        $(this).css('z-index', 9);
                    });
                }
                config.elemAnim.s5.img.animate({
                    opacity: 1,
                    left: 0
                }, {
                    queue: false,
                    duration: config.basicAnimationSpeed,
                    step: function(now, fx) {
                        if (fx.state > 0.2) {
                            config.animateCommonElements(config.elemAnim.s5.header, config.elemAnim.s5.para, config.elemAnim.s5.list, false);
                            if (!config.elemAnim.s5.opts.is(':animated')) {
                                config.elemAnim.s5.opts.animate({
                                    opacity: 1,
                                    bottom: 0
                                }, {
                                    queue: false,
                                    duration: 500
                                });
                            }
                        }
                    }
                });
            },
            animSlide1Out: function(animIn) {
                config.elemAnim.s1.free.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: config.basicAnimationSpeed
                });
                config.elemAnim.s1.downloads.animate({
                    opacity: 0,
                    right: '-20px'
                }, {
                    queue: false,
                    duration: config.basicAnimationSpeed,
                    step: function(now, fx) {
                        if (fx.state > 0.1) {
                            if (!config.elemAnim.s1.img.is(':animated')) {
                                config.elemAnim.s1.img.animate({
                                    opacity: 0,
                                    top: '20px'
                                }, {
                                    queue: false,
                                    duration: config.basicAnimationSpeed
                                });
                            }
                        }
                        if (fx.state > 0.2) {
                            if (!config.elemAnim.s1.header.is(':animated')) {
                                config.elemAnim.s1.header.add(config.elemAnim.s1.headerSpan).animate({
                                    opacity: 0,
                                    top: '-20px'
                                }, {
                                    queue: false,
                                    duration: config.basicAnimationSpeed
                                });
                            }
                        }
                    },
                    complete: function() {
                        $('#slide-1').removeClass('active');
                        animIn();
                    }
                });
            },
            animSlide2Out: function(animIn) {
                var baseSpeed = 50;
                config.elemAnim.s2.p6.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: baseSpeed
                });
                config.elemAnim.s2.p5.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: baseSpeed + 150
                });
                config.elemAnim.s2.p4.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: baseSpeed + 300
                });
                config.elemAnim.s2.p3.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: baseSpeed + 450
                });
                config.elemAnim.s2.p2.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: baseSpeed + 600
                });
                config.elemAnim.s2.p1.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: baseSpeed + 750,
                    step: function(now, fx) {
                        if (fx.state > 0.2) {
                            config.animateCommonElements(config.elemAnim.s2.header, config.elemAnim.s2.para, config.elemAnim.s2.list, true);
                        }
                    },
                    complete: function() {
                        $('#slide-2').removeClass('active');
                        animIn();
                    }
                })
            },
            animSlide3Out: function(animIn) {
                config.elemAnim.s3.img.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: config.basicAnimationSpeed + 200,
                    step: function(now, fx) {
                        if (fx.state > 0.2) {
                            config.animateCommonElements(config.elemAnim.s3.header, config.elemAnim.s3.para, config.elemAnim.s3.list, true);
                        }
                    },
                    complete: function() {
                        $('#slide-3').removeClass('active');
                        animIn();
                    }
                });
            },
            animSlide4Out: function(animIn) {
                config.elemAnim.s4.img.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: config.basicAnimationSpeed + 200,
                    step: function(now, fx) {
                        if (fx.state > 0.2) {
                            config.animateCommonElements(config.elemAnim.s4.header, config.elemAnim.s4.para, config.elemAnim.s4.list, true);
                        }
                    },
                    complete: function() {
                        $('#slide-4').removeClass('active');
                        animIn();
                    }
                });
            },
            animSlide5Out: function(animIn) {
                config.elemAnim.s5.img.animate({
                    opacity: 0,
                    left: '-20px'
                }, {
                    queue: false,
                    duration: config.basicAnimationSpeed,
                    step: function(now, fx) {
                        if (fx.state > 0.2) {
                            config.animateCommonElements(config.elemAnim.s5.header, config.elemAnim.s5.para, config.elemAnim.s5.list, true);
                            if (!config.elemAnim.s5.opts.is(':animated')) {
                                config.elemAnim.s5.opts.animate({
                                    opacity: 0,
                                    bottom: '-20px'
                                }, {
                                    queue: false,
                                    duration: 500,
                                    complete: function() {
                                        $('#slide-5').removeClass('active');
                                        animIn();
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
        //set opacity and reset element attributes
        config.setOpacity();
        //set slider on the center
        var sliderInCenter = function() {
            var margin = ($(window).height() - $('footer.main').outerHeight() - $('#top-navigation').outerHeight() - $('header.main').outerHeight() - $('#slides-box').outerHeight()) / 2;
            if (margin > 0) {
                $('#slides-box').css({
                    marginTop: (margin - 15) + 'px'
                });
            }
        }
        sliderInCenter();
        $(window).resize(function() {
            sliderInCenter();
        });

        // check if image is ready, a parameter is added because of IE problems
        //  if ( $( 'body' ).hasClass( 'home' ) )
        {
            var spLoaded;

            link_query = '';
            if ($('html').hasClass('lt-ie9')) {
                link_query = "?" + new Date().getTime();
            }
            $('<img/>').attr('src', 'img/screenshot.png' + link_query).load(function() {
                spLoaded = 1;
                $('#loading').hide(function() {
                    config.animSlide1();
                });
            });

            setTimeout(function() {
                if (!spLoaded) $('#loading').show();
            },
            1000);
        }

        // set right animation after clicking on the main button
        $('#slider-main-btn a').click(function(e) {
            e.preventDefault();
            if ($('#slide-1').hasClass('active')) {
                $('#slider-navi li').removeClass('active').eq(1).addClass('active');
                config.animSlide1Out(config.animSlide2);
            } else if ($('#slide-2').hasClass('active')) {
                $('#slider-navi li').removeClass('active').eq(2).addClass('active');
                config.animSlide2Out(config.animSlide3);
            } else if ($('#slide-3').hasClass('active')) {
                $('#slider-navi li').removeClass('active').eq(3).addClass('active');
                config.animSlide3Out(config.animSlide4);
            } else if ($('#slide-4').hasClass('active')) {
                $('#slider-navi li').removeClass('active').eq(4).addClass('active');
                config.animSlide4Out(config.animSlide5);
            }
        });

        $('#slider-navi li').click(function() {
            if ($(this).hasClass('active')) {
                return;
            }
            var activeAnimationOut = $('#slider-navi .active').attr('data-animation') + 'Out';
            $('#slider-navi li').removeClass('active');
            $(this).addClass('active');
            config[activeAnimationOut](config[$(this).attr('data-animation')]);
        });
        $("#edit-keys").keyup(function(e) {
            if (e.keyCode == 13 && navigator.userAgent.indexOf('MSIE') != -1) {
                $("#cksource_repo_search_block_form").submit();
            }
            return false;
        });
    })();
});