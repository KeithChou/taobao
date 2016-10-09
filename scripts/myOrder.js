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
	$('body').on('keyup','.header-search-input',function(event){
		//获取输入的值
		var $val = $(this).val();
		//使用$.get()方法，并且将查询的值放在URI后面
		$.get('search.json',{'Query':$val}, function(data) {
			for (var i = 0; i < data.length; i++) {
				//如果值与json中的query字段匹配，动态加载html
				if ($val === data[i][0].Query) {
					var results = data[i][0].Results[0];
					/*
						var $html= '';
						$html+='<ul>';
						//全局函数$.each，也可以使用for循环
						$.each($data, function(index, val) {
							$html+='<li>'+val.Txt+'</li>';
						});
						$html+='</ul>';
					*/

					//js模板引擎
					var $html = template('search',results);

					//下列列表dispaly:none的，当符合条件后
					//调用show()函数，然后设定css样式
					$('.list').html($html).show().css({
						'position':'absolute',
						'left':0,
						'top':$('.header-search-input').height()+5
					})
				}
			}

			//当点击每一条li数据时，会相应的将数据作为搜索框的值
			$('.list li').click(function(event) {
				var $liText = $(this).text();
				$('.header-search-input').val($liText);
			});
		});
		//如果值为空，则隐藏整个列表
		if ($(this).val() === '') {
			$('.list').hide();
		}
		//按下回车时，调用shoppingCart()函数。
		if (event.which === 13) {
			shoppingCart();
		}
	});

	//删除商品
	var thisInfo;
	var previous;
	var next;
	$('body').on('click','.delete',function(event){
			var $this = $(event.target);
			thisInfo = $this.parents('.mainCommodity');
			previous = thisInfo.prev();
			next = thisInfo.next();
			var itemBasisInfo = thisInfo.find('.item-basis-info a').text().trim();
			console.log($('.mainCommodity').last());
			var html = template('delete');
			if ($('.mainCommodity').first()) {
				next.before(html);
			} else {
				previous.after(html);
			};
			thisInfo.detach();
			/*
				var html = '';
				html +='<div class="undo-wrapper">';
				html +='<div class="deleteCom">';
				html +='<p>';
				html +='成功删除';
				html +='<em>1</em>';
				html +='件宝贝，';
				html +='如果有误，可';
				html +='<a href="#" class="turnBack">撤销本次删除</a>';
				html +='</p>';
				html +='</div>';
				html +='</div>';
			*/
			//JS引擎模板
			return false;
	});

	//恢复商品
	$('body').on('click','.turnBack',function(event){
		previous.after(thisInfo);
		$('.undo-wrapper').hide();
		return false;
	})


	//搜索下拉列表隐藏
	$(document).on('click', function(event) {
		$('.list').hide();
	});

	/*
		//降价商品查询
		$('.switch-cart-1').click(function(event) {
			$.get('discount.json', function(data) {
				for (var i = 0; i < data.length; i++) {
					var $data = data[i][0].Results[0].Suggests;
					var $html = '';
					$.each($data, function(index, val) {
						$html+='<div class="mainCommodity">';
						$html+='<div class="shopInfo">';
							$html+='<div class="shopMsg">';
								$html+='<input type="checkbox" name="shopMsg" id="liningBas" class="shopMsg-input" autocomplete="off">';
								$html+='<label for="liningBas">';
								$html+='店铺：';
								$html+='</label>';
								$html+='<a href="#">'+val.shop+'';
								$html+='</a>'
								$html+='</div>';
						$html+='</div>';
						$html+='<div class="commodityInfo">';
						$html+='<ul>';
							$html+='<li class="td-chk">';
								$html+='<div class="td-inner">';
								$html+='<input type="checkbox" name="checkbox" autocomplete="off">';
								$html+='</div>';
							$html+='</li>';
							$html+='<li class="td-item">';
								$html+='<div class="td-inner">';
									$html+='<a class="desImg" href="#">';
									$html+='<img alt="'+val.Txt+'" src="'+val.image+'">';
									$html+='</a>';
									$html+='<div class="item-info">';
										$html+='<div class="item-basis-info">';
											$html+='<a href="#">'+val.Txt+'';
											$html+='</a>';
										$html+='</div>';
										$html+='<div class="item-other-info">';
											$html+='<div class="item-other-space"></div>';
											$html+='<div class="item-other-list">';
												$html+='<a href="#" title="支持信用卡支付">';
													$html+='<img alt="支持信用卡支付" src="'+val.bandCard+'">';
												$html+='</a>';
												$html+='<a href="#" title="7天无理由" class="sevenDay">';
													$html+='<img alt="7天无理由" src="'+val.sevenDay+'">';
												$html+='</a>';
												$html+='<a href="#" title="消费者保障服务">';
													$html+='<img alt="消费者保障服务" src="'+val.guarantee+'">';
												$html+='</a>';
											$html+='</div>';
										$html+='</div>';
									$html+='</div>';
								$html+'</div>';
							$html+='</li>';
							$html+='<li class="td-info">';
								$html+='<div class="td-info-msg">';
									$html+='<p>'+val.color+'</p>';
									$html+='<p>'+val.size+'</p>';
								$html+='</div>';
							$html+='</li>';
							$html+='<li class="td-price">';
								$html+='<div class="td-inner">';
									$html+='<p class="non-discount">'+val.nonDiscount+'</p>';
									$html+='<p class="discount">￥';
										$html+='<span>'+val.num+'</span>';
									$html+='</p>';
									$html+='<div class="promotion">卖家促销';
										$html+='<i class="promotionIcon"></i>';
									$html+='</div>';
									$html+='<div class="proSlidedown">';
										$html+='<p class="newPro">卖家促销：秋季特惠</p>';
										$html+='<p>优惠：￥200.00</p>';
									$html+='</div>';
								$html+='</div>';
							$html+='</li>';
							$html+='<li class="td-amount">';
								$html+='<div class="item-amount">';
									$html+='<a href="#" class="amount-left amount-color">-</a>';
									$html+='<input type="text" name="amountNum" value="1" autocomplete="off" />';
									$html+='<a href="#" class="amount-right">+</a>';
								$html+='</div>';
							$html+='</li>';
							$html+='<li class="td-sum">';
								$html+='<em>￥</em>'
								$html+='<span>'+val.num+'</span>';
							$html+='</li>';
							$html+='<li class="td-operation">';
								$html+='<p>';
									$html+='<a href="#">删除</a>';
								$html+='</p>';
							$html+='</li>';
						$html+='</ul>';
						$html+='</div>';
						$html+='</div>';
						$('.commodityContainer').html($html);
					});
				}
			});
			return false;
		});

	*/


	//购物车存放产品--- 通用function
	function shoppingCart(){
		//获取输入框的值，用于字符串匹配
		var $val = $('.header-search-input').val();
		$.get('basketballShoes.json',{'Query':$val}, function(data) {
			for (var i = 0; i < data.length; i++) {
				if ($val === data[i][0].Query) {
					//字符串匹配
					//当输入'lan'时，会匹配第一个数组
					//当输入'音速3'时，会匹配第二个数组。
					//也可以自行修改字符串匹配规则。
					var $data = data[i][0].Results[0].Suggests;
					var results = data[i][0].Results[0];
					
					/*第一种方法：手写拼接字符串，效率低，易出错，
					结构与数据未分离，不推荐使用这种方法拼接字符串*/
					/*
						var $html = '';
						//使用$.each()方法循环每一个$data，
						//然后动态加载html,
						//把相应的商品信息放到指定的.commodityContainer容器中
						$.each($data, function(index, val) {
							$html+='<div class="mainCommodity">';
							$html+='<div class="shopInfo">';
								$html+='<div class="shopMsg">';
									//$.each()中回调函数中的第二个参数指定的是每一个值，
									//通过点操作来获取每个字段。
									//比如val.label 就为 '李宁2016新款男子篮球鞋音速3高帮反弹篮球场地鞋ABAL031'。
									//下面的操作相同。
									$html+='<input type="checkbox" name="shopMsg" id="'+val.label+'" class="shopMsg-input" autocomplete="off">';
									$html+='<label for="'+val.label+'">';
									$html+='店铺：';
									$html+='</label>';
									$html+='<a href="#">'+val.shop+'';
									$html+='</a>'
								$html+='</div>';
							$html+='</div>';
							$html+='<div class="commodityInfo">';
							$html+='<ul>';
								$html+='<li class="td-chk">';
									$html+='<div class="td-inner">';
									$html+='<input type="checkbox" name="checkbox" autocomplete="off">';
									$html+='</div>';
								$html+='</li>';
								$html+='<li class="td-item">';
									$html+='<div class="td-inner">';
										$html+='<a class="desImg" href="#">';
										$html+='<img alt="'+val.Txt+'" src="'+val.image+'">';
										$html+='</a>';
										$html+='<div class="item-info">';
											$html+='<div class="item-basis-info">';
												$html+='<a href="#">'+val.Txt+'';
												$html+='</a>';
											$html+='</div>';
											$html+='<div class="item-other-info">';
												$html+='<div class="item-other-space"></div>';
												$html+='<div class="item-other-list">';
													$html+='<a href="#" title="支持信用卡支付">';
														$html+='<img alt="支持信用卡支付" src="'+val.bandCard+'">';
													$html+='</a>';
													$html+='<a href="#" title="7天无理由" class="sevenDay">';
														$html+='<img alt="7天无理由" src="'+val.sevenDay+'">';
													$html+='</a>';
													$html+='<a href="#" title="消费者保障服务">';
														$html+='<img alt="消费者保障服务" src="'+val.guarantee+'">';
													$html+='</a>';
												$html+='</div>';
											$html+='</div>';
										$html+='</div>';
									$html+'</div>';
								$html+='</li>';
								$html+='<li class="td-info">';
									$html+='<div class="td-info-msg">';
										$html+='<p>'+val.color+'</p>';
										$html+='<p>'+val.size+'</p>';
									$html+='</div>';
								$html+='</li>';
								$html+='<li class="td-price">';
									$html+='<div class="td-inner">';
										$html+='<p class="non-discount">'+val.nonDiscount+'</p>';
										$html+='<p class="discount">￥';
											$html+='<span>'+val.num+'.00</span>';
										$html+='</p>';
										$html+='<div class="promotion">卖家促销';
											$html+='<i class="promotionIcon"></i>';
										$html+='</div>';
										$html+='<div class="proSlidedown">';
											$html+='<p class="newPro">卖家促销：秋季特惠</p>';
											$html+='<p>优惠：￥'+val.disc+'</p>';
										$html+='</div>';
									$html+='</div>';
								$html+='</li>';
								$html+='<li class="td-amount">';
									$html+='<div class="item-amount">';
										$html+='<a href="#" class="amount-left amount-color">-</a>';
										$html+='<input type="text" name="amountNum" value="1" autocomplete="off" />';
										$html+='<a href="#" class="amount-right">+</a>';
									$html+='</div>';
									$html+='<div class="stock">'+val.max+'</div>';
									$html+='<div class="outNum">';
										$html+='<span class="instr">最多只能购买</span>';
										$html+='<span class="stockNum"></span>';
										$html+='<em>件</em>';
									$html+='</div>';
								$html+='</li>';
								$html+='<li class="td-sum">';
									$html+='<em>￥</em>'
									$html+='<span>'+val.num+'.00</span>';
								$html+='</li>';
								$html+='<li class="td-operation">';
									$html+='<p>';
										$html+='<a href="#" class="delete">删除</a>';
									$html+='</p>';
								$html+='</li>';
							$html+='</ul>';
							$html+='</div>';
							$html+='</div>';
							//将动态加载的html放到指定的容器中，
							//这里首先应该在html中放放上一个空容器
							//<div className="commidityContainer"></div>
							$('.commodityContainer').html($html);


						});
					*/

					/*第二种方法：使用js模板引擎，结构与数据分离，
					并且altTemplate效率高，速度快，推荐使用。*/
					var $html = template('basketBallShoes',results);
					$('.commodityContainer').html($html);
				}
			}
		});
	}

	//搜索购物车内存放的产品
	$('.header-search button').click(function(event) {
		shoppingCart();
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
	$('body').on('mouseenter mouseleave','.promotion',function(event){
		if (event.type==='mouseenter') {
			$(this).siblings('.proSlidedown').stop().show('fast');
		} else {
			$(this).siblings('.proSlidedown').stop().hide('fast');
		}
	});


	//商品库存
	function stock(that){
		var $stock = parseInt(that.parent('.item-amount').siblings('.stock').text());
		var thisNum = that.parent().find('input').val();
		var thisOutNum = that.parent().siblings('.outNum');
		var thisStockNum = thisOutNum.find('.stockNum');
		if (parseInt(thisNum) > $stock) {
			thisOutNum.show('fast');
		} else {
			thisOutNum.hide('fast');
		}
		thisStockNum.text($stock);
	}



	//商品数量的输入框
	$('body').on('keypress keyup blur','.item-amount input',function(event){
		if (event.type==='keypress') {
			var thisParent = $(this).parents('.td-amount');
			var thisInput = $(this).parent('.item-amount');
			var $text = thisParent.siblings('.td-price').find('span').text();
			var tdSum = thisParent.find('.td-sum').children('span');
			var keyCode = event.keyCode ? event.keyCode : event.charCode ;
			if (keyCode !== 0 && (keyCode <48 || keyCode >57) && keyCode!==8 && keyCode !==37 && keyCode !==39 && keyCode !==46) {
				return false;
			} else {
				return true;
			};
		} else if(event.type ==='keyup'){
			stock($(this));
			var $stock = parseInt($(this).parent('.item-amount').siblings('.stock').text());
			var thisParent = $(this).parents('.td-amount');
			var thisInput = $(this).parent('.item-amount');
			var $text = thisParent.siblings('.td-price').find('span').text();
			var tdSum = thisParent.siblings('.td-sum').find('span');
			var keyCode = event.keyCode ? event.keyCode : event.charCode ;
			if (keyCode !== 8) {
				var num = parseInt($(this).val()) || 0;
				if (num < 1) {
					num = 1;
				} else if(num > $stock){
					num = $stock;
				} else {
					num = num;
				}
				var num = $(this).val();
				tdSum.text($text * num + '.00');
			};
			var anNum = $(this).val();
			tdSum.text($text * anNum +'.00');
			getCount();
		} else {
			stock($(this));
			var $stock = parseInt($(this).parent('.item-amount').siblings('.stock').text());
			var thisParent = $(this).parents('.td-amount');
			var thisInput = $(this).parent('.item-amount');
			var $text = thisParent.siblings('.td-price').find('span').text();
			var tdSum = thisParent.siblings('.td-sum').find('span');
			var keyCode = event.keyCode ? event.keyCode : event.keyCode;
			var num = parseInt($(this).val()) || 0;
			if (num > $stock) {
				num = $stock;
			} else if(num < 1){
				num = 1;
			} else {
				num = num;
			}
			$(this).val(num);
			var anNum = $(this).val();
			tdSum.text($text * anNum +'.00');
			getCount();
		}
	});

	//商品数量增加
	$('body').on('click','.amount-right',function(event){
		var $stock = parseInt($(this).parent('.item-amount').siblings('.stock').text());
		var thisParent = $(this).parents('.td-amount');
		var thisInput = $(this).parent('.item-amount');
		var $text = thisParent.siblings('.td-price').find('span').text();
		var tdSum = thisParent.siblings('.td-sum').find('span');
		var num = thisInput.find('input').val();
		if (num < $stock) {
			num++;
			thisInput.find('input').val(num);
		} else {
			$(this).parent().siblings('.outNum').show('fast');
		}
		$('.amount-left').css({
			'cursor':'pointer',
			'color':'#444'
		})
		tdSum.text($text * num + '.00');
		getCount();
		// stock($(this));
		return false;
	});

	//商品数量减少
	$('body').on('click','.amount-left',function(event){
		var $stock = parseInt($(this).parent('.item-amount').siblings('.stock').text());
		var thisParent = $(this).parents('.td-amount');
		var thisInput = $(this).parent('.item-amount');
		var $text = thisParent.siblings('.td-price').find('span').text();
		var tdSum = thisParent.siblings('.td-sum').find('span');
		var num = parseInt(thisInput.find('input').val());
		if (num > 1 ) {
			num-1;
			thisInput.find('input').val(num);
		}
		tdSum.text($text * num +'.00');
		getCount();
		stock($(this));
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


	//获得已选中商品和商品价格总额
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

	//商品全选
	$('.selectAll').on('click', '.allSelected1', function(event) {
		if ($(this).prop('checked')) {
			$(':checkbox').prop('checked',true);
			$('.commodityInfo').css({
				'background-color':'#FFF8E1'
			});
			$('.submit-btn').css({
				'background-color':'#f40',
				'cursor':'pointer'
			});
			$('#btn-sum').css({
				'background-color':'#f40',
				'cursor':'pointer'
			});
		} else {
			$(':checkbox').prop('checked',false);
			$('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
			$('.submit-btn').css({
				'background-color':'#aaa',
				'cursor':'not-allowed'
			})
			$('#btn-sum').css({
				'background-color':'#aaa',
				'cursor':'not-allowed'
			})
		}
		getCount();
	});

	//未选中商品时禁止点击
	$('.submit-btn').click(function(event) {
		return false;
	});
	$('#btn-sum').click(function(event) {
		return false;
	});


	//fixed中的全选按钮
	$('.all-selected').on('click', '.allSelected2', function(event) {
		if ($(this).prop('checked')) {
			$(':checkbox').prop('checked',true);
			$('.commodityInfo').css({
				'background-color':'#FFF8E1'
			});
			$('.submit-btn').css({
				'background-color':'#f40',
				'cursor':'pointer'
			})
			$('#btn-sum').css({
				'background-color':'#f40',
				'cursor':'pointer'
			})
		} else {
			$(':checkbox').prop('checked',false);
			$('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
			$('.submit-btn').css({
				'background-color':'#aaa',
				'cursor':'not-allowed'
			})
			$('#btn-sum').css({
				'background-color':'#aaa',
				'cursor':'not-allowed'
			})
		}
		getCount();
	});




	//取消全选
	function cancelSelect(){
		if ($('.td-inner input').length === $('.td-inner input:checked').length) {
			$('.allSelected1').prop('checked',true);
			$('.allSelected2').prop('checked',true);
		} else {
			$('.allSelected1').prop('checked',false);
			$('.allSelected2').prop('checked',false);
		}
	}

	//如果有商品未选中，则取消全选。
	function cancelCalculator(){
		if ($('.td-inner input:checked').length === 0) {
			$('#btn-sum').css({
				'background-color':'#aaa',
				'cursor':'not-allowed'
			});
			$('.submit-btn').css({
				'background-color':'#aaa',
				'cursor':'not-allowed'
			});
		} else {
			$('#btn-sum').css({
				'background-color':'#f40',
				'cursor':'pointer'
			});
			$('.submit-btn').css({
				'background-color':'#f40',
				'cursor':'pointer'
			})
		}
	}


	//点击某商品时选中
	$('body').on('click','.td-inner input',function(event){
		if ($(this).prop('checked')) {
			$(this).parents('.commodityInfo').siblings('.shopInfo').find('input').prop('checked',true);
			$(this).parents('.commodityInfo').css({
				'background-color':'#fff8e1'
			});
		} else {
			$(this).parents('.commodityInfo').siblings('.shopInfo').find('input').prop('checked',false);
			$(this).parents('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
		}
		cancelCalculator();
		cancelSelect();
		getCount();
	});

	//点击某商品时选中
	$('body').on('click','.shopInfo input',function(event){
		if ($(this).prop('checked')) {
			$(this).parents('.shopInfo').siblings('.commodityInfo').find('.td-inner input').prop('checked',true);
			$(this).parents('.shopInfo').siblings('.commodityInfo').css({
				'background-color':'#fff8e1'
			});
		} else {
			$(this).parents('.shopInfo').siblings('.commodityInfo').find('.td-inner input').prop('checked',false);
			$(this).parents('.shopInfo').siblings('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
		}
		cancelCalculator();
		cancelSelect();
		getCount();
	});
















/********************MOBILE***********************/

	//mobile中fixed全选
	$('.all-selected1').on('click','.allSelected2',function(event){
		if ($(this).prop('checked')) {
			$(':checkbox').prop('checked',true);
			$('.commodityInfo').css({
				'background-color':'#FFF8E1'
			});
		} else {
			$(':checkbox').prop('checked',false);
			$('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
		}
		getCountMobile();
	})

	//mobile中点击某商品时选中
	$('body').on('click','.td-inner1 input',function(event){
		if ($(this).prop('checked')) {
			$(this).parents('.commodityInfo').siblings('.shopInfo1').find('input').prop('checked',true);
			$(this).parents('.commodityInfo').css({
				'background-color':'#fff8e1'
			});
		} else {
			$(this).parents('.commodityInfo').siblings('.shopInfo1').find('input').prop('checked',false);
			$(this).parents('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
		}
		cancelSelectMobile();
		getCountMobile();
	});

	//mobile中点击某商品时选中
	$('body').on('click','.shopInfo1 input',function(event){
		if ($(this).prop('checked')) {
			$(this).parents('.shopInfo1').siblings('.commodityInfo').find('.td-inner1 input').prop('checked',true);
			$(this).parents('.shopInfo1').siblings('.commodityInfo').css({
				'background-color':'#fff8e1'
			});
		} else {
			$(this).parents('.shopInfo1').siblings('.commodityInfo').find('.td-inner1 input').prop('checked',false);
			$(this).parents('.shopInfo1').siblings('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
		}
		cancelSelectMobile();
		getCountMobile();
	});

	//商品数量的输入框
	$('body').on('keypress keyup blur','.changeCount input',function(event){
		if (event.type==='keypress') {
			var thisParent = $(this).parents('.td-amount');
			var thisInput = $(this).parent('.item-amount');
			var $text = thisParent.siblings('.td-price').find('span').text();
			var tdSum = thisParent.find('.td-sum').children('span');
			var keyCode = event.keyCode ? event.keyCode : event.charCode ;
			if (keyCode !== 0 && (keyCode <48 || keyCode >57) && keyCode!==8 && keyCode !==37 && keyCode !==39 && keyCode !==46) {
				return false;
			} else {
				return true;
			};
		} else if(event.type ==='keyup'){
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
			getCount();
		} else {
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
			getCount();
		}
	});




	//Mobile商品数量增加
	$('body').on('click','.plusCount',function(event){
		var thisParentS = $(this).parents('.shopInfo1').siblings('.commodityInfo');
		var unitPrice = thisParentS.find('.unitPrice').text();
		var thisInput = $(this).parent('.changeCount');
		var $sum = thisParentS.find('.discount');
		var $text = thisParentS.find('.discount').text();
		var num = thisInput.find('input').val();
		num++;
		thisInput.find('input').val(num);
		$sum.text(unitPrice * num + '.00');
		getCountMobile();
		return false;
	});

	//Mobile商品数量减少
	$('body').on('click','.substrCount',function(event){
		var thisParentS = $(this).parents('.shopInfo1').siblings('.commodityInfo');
		var unitPrice = thisParentS.find('.unitPrice').text();
		var thisInput = $(this).parent('.changeCount');
		var $sum = thisParentS.find('.discount');
		var $text = thisParentS.find('.discount').text();
		var num = thisInput.find('input').val();
		if (num>1) {
			num--;
			thisInput.find('input').val(num);
		}
		$sum.text(unitPrice * num + '.00');
		getCountMobile();
		return false;
	});

	//Mobile商品数量减少
	$('body').on('click','.amount-left',function(event){
		var thisParent = $(this).parents('.td-amount');
		var thisInput = $(this).parent('.item-amount');
		var $text = thisParent.siblings('.td-price').find('span').text();
		var tdSum = thisParent.siblings('.td-sum').find('span');
		var num = thisInput.find('input').val();
		if (num > 1 ) {
			num--;
			thisInput.find('input').val(num);
		}
		tdSum.text($text * num +'.00');
		getCount();
		return false;
	});

	//mobile中取消全选
	function cancelSelectMobile(){
		if ($('.td-inner1 input').length === $('.td-inner1 input:checked').length) {
			$('.allSelected2').prop('checked',true);
		} else {
			$('.allSelected2').prop('checked',false);
		}
	}


	//mobile中获得已选中商品和商品价格总额
	function getCountMobile(){
		var counts = 0;
		var sum = 0;
		$('.td-inner1 input').each(function(index, el) {
			if ($(this).prop('checked')) {
				for (var i = 0; i < $(this).length; i++) {
					counts += parseInt($(this).parents('.td-chk').siblings('.td-info1').find('.discount').text());
					sum += 1;
				}
			}
		});
		$('.totalSum').text(sum);
		$('.total-sum').html((counts).toFixed(2));
	};




});
