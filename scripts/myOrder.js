$(document).ready(function() {
	//'我的淘宝'二级菜单
	$('.nav_myTao').hover(function() {
		$(this).css({
			'background-color':"#fff"
		}).find('.nav-myTao-nav').show();
	}, function() {
		$(this).css({
			'background-color':"#f5f5f5"
		}).find('.nav-myTao-nav').hide();
	});

     //'收藏夹'二级菜单
	$('.nav_collection').hover(function() {
		$(this).css({
			'background-color':"#fff"
		}).find('.nav-myTao-nav').show();
	}, function() {
		$(this).css({
			'background-color':'#f5f5f5'
		}).find('.nav-myTao-nav').hide();
	});

    //'卖家中心'二级菜单
	$('.nav_sellCenter').hover(function() {
		$(this).css({
			'background-color':'#fff'
		}).find('.nav-myTao-nav').show();
	}, function() {
		$(this).css({
			'background-color':'#f5f5f5'
		}).find('.nav-myTao-nav').hide();
	});

	//'联系'二级菜单
	$('.nav_contact').hover(function() {
		$(this).css({
			'background-color':'#fff'
		}).find('.nav-myTao-nav').show();
	}, function() {
		$(this).css({
			'background-color':'#f5f5f5'
		}).find('.nav-myTao-nav').hide();
	});

	//搜索框下拉列表
	$('.header-search-input').keyup(function(event) {
		var $val = $(this).val();
		$.get('search.json?='+$val, function(data) {
			for (var i = 0; i < data.length; i++) {
				if ($val === data[i][0].Query) {
					var $data = data[i][0].Results[0].Suggests;
					var $html= '';
					$html+='<ul>';
					$.each($data, function(index, val) {
						$html+='<li>'+val.Txt+'</li>';
					});
					$html+='</ul>';
					$('.list').html($html).show().css({
						'position':'absolute',
						'left':$('.header-search-input').offset().left,
						'top':$('.header-search-input').offset().top+$('.header-search-input').height()+5
					})
				}
			}
			$('.list li').click(function(event) {
				var $liText = $(this).text();
				$('.header-search-input').val($liText);
			});
		});
		if ($(this).val() === '') {
			$('.list').hide();
		}
	});

	//搜索下拉列表隐藏
	$(document).on('click', function(event) {
		$('.list').hide();
	});

	//下边框移动
	$('.btn-switch-cart').mouseenter(function(event) {
		$('.btn-switch-cart').removeClass('selectColumn');
		$(this).addClass('selectColumn');
	}).mouseleave(function(event) {
		$('.btn-switch-cart').removeClass('selectColumn');
		$('.switch-cart-0').addClass('selectColumn');
	});

	//卖家促销下拉列表
	$('.promotion').hover(function() {
		$(this).siblings('.proSlidedown').stop().show('fast');
	}, function() {
		$(this).siblings('.proSlidedown').stop().hide('fast');
	});


	//商品数量的输入框
	$('.item-amount input').keypress(function(event) {
		var thisParent = $(this).parents('.td-amount');
		var thisInput = $(this).parent('.item-amount');
		var $text = thisParent.siblings('.td-price').find('span').text();
		var tdSum = thisParent.find('.td-sum').children('span');
		var keyCode = event.keyCode ? event.keyCode : event.charCode ;
		if (keyCode !== 0 && (keyCode <48 || keyCode >57) && keyCode!==8 && keyCode !==37 && keyCode !==39 && keyCode !==46) {
			return false;
		} else {
			return true;
		}
	}).keyup(function(event) {
		var thisParent = $(this).parents('.td-amount');
		var thisInput = $(this).parent('.item-amount');
		var $text = thisParent.siblings('.td-price').find('span').text();
		var tdSum = thisParent.siblings('.td-sum').find('span');
		var keyCode = event.keyCode ? event.keyCode : event.charCode ;
		if (keyCode !== 8) {
			var num = parseInt($(this).val()) || 0;
			num = num < 1 ? 1 : num;
			var num = $(this).val();
			tdSum.text($text * num + '.00');
		};
		var anNum = $(this).val();
		tdSum.text($text * anNum +'.00');
	}).blur(function(event) {
		var thisParent = $(this).parents('.td-amount');
		var thisInput = $(this).parent('.item-amount');
		var $text = thisParent.siblings('.td-price').find('span').text();
		var tdSum = thisParent.siblings('.td-sum').find('span');
		var keyCode = event.keyCode ? event.keyCode : event.keyCode;
		var num = parseInt($(this).val()) || 0;
		num = num < 1 ? 1 : num ;
		$(this).val(num);
		var anNum = $(this).val();
		tdSum.text($text * anNum +'.00');
	});

	//商品数量增加
	$('.amount-right').click(function(event) {
		var thisParent = $(this).parents('.td-amount');
		var thisInput = $(this).parent('.item-amount');
		var $text = thisParent.siblings('.td-price').find('span').text();
		var tdSum = thisParent.siblings('.td-sum').find('span');
		var num = thisInput.find('input').val();
		num++;
		thisInput.find('input').val(num);
		$('.amount-left').css({
			'cursor':'pointer',
			'color':'#444'
		})
		tdSum.text($text * num + '.00');
		getCount();
		return false;
	});

	//商品数量减少
	$('.amount-left').click(function(event){
		var thisParent = $(this).parents('.td-amount');
		var thisInput = $(this).parent('.item-amount');
		var $text = thisParent.siblings('.td-price').find('span').text();
		var tdSum = thisParent.siblings('.td-sum').find('span');
		var num = thisInput.find('input').val();
		if (num > 1 ) {
			num--;
			thisInput.find('input').val(num);
		}
		tdSum.text($text * num +' .00');
		getCount();
		return false;
	});

	//全选商品金额相加
	function sumTotal(){
		var $tdSum = $('.td-sum').find('span').text().split('.00');
		var $total=0;
		for (var i = 0; i < $tdSum.length-1; i++) {
			$total+=parseInt($tdSum[i]);
		}
		return $total;
	}

	function getCount(){
		var counts = 0;
		var sum = 0;
		$('.td-inner input').each(function(index, el) {
			if ($(this).prop('checked')) {
				for (var i = 0; i < $(this).length; i++) {
					counts += parseInt($(this).parents('.td-chk').siblings('.td-sum').find('span').text());
					sum += 1;
				}
			}
		});
		$('.totalSum').text(sum);
		$('.total-sum').html((counts).toFixed(2));
		$('.total-symbol').html((counts).toFixed(2));
	};

	$('.selectAll').on('click', '.allSelected1', function(event) {
		if ($(this).prop('checked')) {
			$(':checkbox').prop('checked',true);
			$('.commodityInfo').css({
				'background-color':'#FFF8E1'
			});
		} else {
			$(':checkbox').prop('checked',false);
			$('.commodityInfo').css({
				'background-color':'#fcfcfc'
			})
		}
		getCount();
	});

	$('.td-inner input').click(function(event) {
		if ($(this).prop('checked')) {
			$(this).parents('.commodityInfo').siblings('.shopInfo').find('input').prop('checked',true);
			$(this).parents('.commodityInfo').css({
				'background-color':'#fff8e1'
			});
			getCount();
		} else {
			$(this).parents('.commodityInfo').siblings('.shopInfo').find('input').prop('checked',false);
			$(this).parents('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
		}
		getCount();
	});

	$('.shopInfo input').click(function(event) {
		if ($(this).prop('checked')) {
			$(this).parents('.shopInfo').siblings('.commodityInfo').find('.td-inner input').prop('checked',true);
			$(this).parents('.shopInfo').siblings('.commodityInfo').css({
				'background-color':'#fff8e1'
			});
			getCount();
		} else {
			$(this).parents('.shopInfo').siblings('.commodityInfo').find('.td-inner input').prop('checked',false);
			$(this).parents('.shopInfo').siblings('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
		}
		getCount();
	});
});
