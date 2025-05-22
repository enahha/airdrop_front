<template>
  <div v-if="popUp" class="popup_wrap" id="popup01">
    <div class="pop_contents">
    <div class="swiper mySwiper swiper-initialized swiper-horizontal">
    <div class="swiper-wrapper" id="swiper-wrapper-243cefbddc43c2c7" aria-live="off" style="transition-duration: 300ms;">
    <div class="swiper-slide" data-swiper-slide-index="0" role="group" aria-label="1 / 1"><img src="images/popup_img.jpg" alt=""></div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"><span class="swiper-pagination-bullet"></span></div>
    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
    </div>
    <div class="pop_footer">
    <button @click="closeForDay" class="close_day">Don't open for a day<i class="xi-close"></i></button>
    <button @click="closePopUp" class="close_one">Close<i class="xi-close"></i></button>
    </div>
  </div>

  <div class="header" :class="{ 'is-open': isOpen }">
    <div class="openBg"></div>
    <div>
      <h1 class="logo"><a @click="selectNation('')"><img src="images/logo.png" alt=""></a></h1>

      <div class="inner">
        <nav class="pcNav">
          <ul>
            <li><a @click.prevent="scrollToSection('sec01')">MINT</a></li>
            <li><a @click.prevent="scrollToSection('sec02')">WTEC</a></li>
            <li><a @click.prevent="scrollToSection('sec03')">ALYA <span>l</span> FITRI</a></li>
            <li><a @click.prevent="scrollToSection('sec04')">BITCOIN</a></li>
            <li><a @click.prevent="scrollToSection('sec05')">MEMBERSHIP</a></li>
          </ul>
  
          <div class="right">
            <div class="nation">
              <div class="current" @click="currentMenu = !currentMenu"><img src="images/usa.png" alt=""></div>
              <div class="list" v-show="currentMenu">
                <a @click="selectNation('idn')"><img src="images/india.png" alt=""></a>
                <a @click="selectNation('kor')"><img src="images/korea.png" alt=""></a>
              </div>
            </div>
            <a @click.prevent="goMypage" class="mypage">My Page</a>
          </div>
        </nav>

        <nav class="moNav">
          <div class="right">
            <div class="nation">
              <div class="list">
                <a @click="selectNation('idn')"><img src="images/india.png" alt=""></a>
                <a @click="selectNation('')" class="current"><img src="images/usa.png" alt=""></a>
                <a @click="selectNation('kor')"><img src="images/korea.png" alt=""></a>
              </div>
            </div>
            <a @click.prevent="goMypage" class="mypage">My Page</a>
          </div>
          
          <ul>
            <li><a @click.prevent="scrollToSection('sec01')">MINT</a></li>
            <li><a @click.prevent="scrollToSection('sec02')">WTEC</a></li>
            <li><a @click.prevent="scrollToSection('sec03')">ALYA <span>l</span> FITRI</a></li>
            <li><a @click.prevent="scrollToSection('sec04')">BITCOIN</a></li>
            <li><a @click.prevent="scrollToSection('sec05')">MEMBERSHIP</a></li>
          </ul>
        </nav>
  
        <a v-if="getWalletAddress" class="wallet" @click.prevent="disconnectMetamaskWallet()">
          <img src="logo/logo_metamask.png" width="30" alt="">
          {{ getWalletAddressLast }}
        </a>
        <a v-else class="wallet" @click.prevent="connectMetaMaskWallet()">
          <img src="logo/logo_metamask.png" width="30" alt="">
          Connect Wallet
        </a>

        <div class="side_buger">
          <div class="buger" @click="toggleOpen">
            <button>
              <span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="main_container">
    <div id="sec01">
      <div>
        <div class="contents">
          <div class="title">
            <div>
              <h2>Real World Assets <br>New Paradigm</h2>
              <p>BUMI BAND NFT</p>
            </div>
          </div>
  
          <ul class="nft_list">
            <li>
              <div class="img"><img src="images/silver_NFT.png" alt=""></div>
              <div class="txt">
                <form action="">
                  <p class="price">NFT Price <b>$ 1,250</b></p>
    
                  <div class="inner">
                    <div class="name">
                      <p class="sub_t">NFT Name</p>
                      <p>BUMI BAND <img src="images/name_icon01.png" alt=""></p>
                    </div>
    
                    <div class="quantity">
                      <p class="sub_t">NFT Purchase quantity</p>
                      <p>1 <span>EA</span></p>
                    </div>
    
                    <div class="components">
                      <p class="sub_t">NFT Components</p>
                      <ul>
                        <li>WTEC</li>
                        <li>Fitri 1</li>
                        <li>3D Room</li>
                        <li>Bitcoin 35TH</li>
                      </ul>
                    </div>
    
                    <div class="sales">
                      <p class="sub_t">Sales Quantity</p>
                      <div class="percent">
                        <p>1,000</p>
                        <p class="bar">
                          <span :style="{ width: (remainQuantity_a / 10) + '%' }"></span>
                          <!-- span.number 가  right:100%면 span.number에 radius클래스 추가해야함 -->
                          <span class="number"
                          :class="{ 'radius': remainQuantity_a === 1000 }"
                          :style="{ right: (remainQuantity_a / 10) + '%' }">
                            <img src="images/remaining_icon.png" alt="">
                            <br>Remaining: {{ remainQuantity_a }}
                          </span>
                        </p>
                        <p>0</p>
                      </div>
                    </div>
    
                    <div class="payment">
                      <div>
                        <p class="sub_t">Payment</p>
                        <p>{{ Number(paymentCurrencyAmountTypeA).toLocaleString() }} {{ paymentCurrencySymbolTypeA }}</p>
                      </div>
                      <div class="ck_box">
                        <p>
                          <label for="USDT_1">
                            <input type="radio" name="coin" id="USDT_1" value="0" v-model="a_mintCurrencySymbolIndex" @click="getTokenAmount(0, 0)" checked>
                            <span></span>
                            USDT
                          </label>
                        </p>
                        <p>
                          <label for="WTEC_1" @click="showComingSoonModal">
                            <input type="radio" name="coin" id="WTEC_1" value="1" v-model="a_mintCurrencySymbolIndex" @click="getTokenAmount(0, 1)" disabled>
                            <span></span>
                            WTEC
                          </label>
                        </p>
                      </div>
                    </div>
    
                    <button 
                      type="button"
                      :class="remainQuantity_a === 0 ? 'btn soldout' : 'btn minting'" 
                      @click="minting(0, a_mintCurrencySymbolIndex)"
                      :disabled="remainQuantity_a === 0 || !isButtonActive"
                      >
                      PAY
                    </button>
                  </div>
                </form>
              </div>
            </li>
  
            <li>
              <div class="img"><img src="images/gold_NFT.png" alt=""></div>
              <div class="txt">
                <form action="">
                  <p class="price">NFT Price <b>$ 2,500</b></p>
    
                  <div class="inner">
                    <div class="name">
                      <p class="sub_t">NFT Name</p>
                      <p>BUMI BAND <img src="images/name_icon02.png" alt=""></p>
                    </div>
    
                    <div class="quantity">
                      <p class="sub_t">NFT Purchase quantity</p>
                      <p>1 <span>EA</span></p>
                    </div>
    
                    <div class="components">
                      <p class="sub_t">NFT Components</p>
                      <ul>
                        <li>WTEC</li>
                        <li>Alya 1</li>
                        <li>Fitri 1</li>
                        <li>3D Room</li>
                        <li>Bitcoin 70TH</li>
                      </ul>
                    </div>
    
                    <div class="sales">
                      <p class="sub_t">Sales Quantity</p>
                      <div class="percent">
                        <p>1,000</p>
                        <p class="bar">
                          <span :style="{ width: (remainQuantity_s / 10) + '%' }"></span>
                          <!-- span.number 가  right:100%면 span.number에 radius클래스 추가해야함 -->
                          <span class="number"
                          :class="{ 'radius': remainQuantity_s === 1000 }"
                          :style="{ right: (remainQuantity_s / 10) + '%' }">
                            <img src="images/remaining_icon.png" alt="">
                            <br>Remaining: {{ remainQuantity_s }}
                          </span>
                        </p>
                        <p>0</p>
                      </div>
                    </div>
    
                    <div class="payment">
                      <div>
                        <p class="sub_t">Payment</p>
                        <p>{{ Number(paymentCurrencyAmountTypeS).toLocaleString() }} {{ paymentCurrencySymbolTypeS }}</p>
                      </div>
                      <div class="ck_box">
                        <p>
                          <label for="USDT_2">
                            <input type="radio" name="coin" id="USDT_2" value="0" v-model="s_mintCurrencySymbolIndex" @click="getTokenAmount(1, 0)" checked>
                            <span></span>
                            USDT
                          </label>
                        </p>
                        <p>
                          <label for="WTEC_2" @click="showComingSoonModal">
                            <input type="radio" name="coin" id="WTEC_2" value="1" v-model="s_mintCurrencySymbolIndex" @click="getTokenAmount(1, 1)" disabled>
                            <span></span>
                            WTEC
                          </label>
                        </p>
                      </div>
                    </div>
    
                    <button 
                      type="button"
                      :class="remainQuantity_s === 0 ? 'btn soldout' : 'btn minting'" 
                      @click="minting(1, s_mintCurrencySymbolIndex)"
                      :disabled="remainQuantity_s === 0 || !isButtonActive"
                    >
                      PAY
                    </button>
                  </div>
                </form>
              </div>
            </li>
  
            <li>
              <div class="img"><img src="images/purple_NFT.png" alt=""></div>
              <div class="txt">
                <form action="">
                  <p class="price">NFT Price <b>$ 5,000</b></p>
    
                  <div class="inner">
                    <div class="name">
                      <p class="sub_t">NFT Name</p>
                      <p>BUMI BAND <img src="images/name_icon03.png" alt=""></p>
                    </div>
    
                    <div class="quantity">
                      <p class="sub_t">NFT Purchase quantity</p>
                      <p>1 <span>EA</span></p>
                    </div>
    
                    <div class="components">
                      <p class="sub_t">NFT Components</p>
                      <ul>
                        <li>WTEC</li>
                        <li>Alya 1</li>
                        <li>Fitri 2</li>
                        <li>3D Room</li>
                        <li>Bitcoin 150TH</li>
                      </ul>
                    </div>
    
                    <div class="sales">
                      <p class="sub_t">Sales Quantity</p>
                      <div class="percent">
                        <p>1,000</p>
                        <p class="bar">
                          <span :style="{ width: (remainQuantity_r / 10) + '%' }"></span>
                          <!-- span.number 가  right:100%면 span.number에 radius클래스 추가해야함 -->
                          <span class="number"
                          :class="{ 'radius': remainQuantity_r === 1000 }"
                          :style="{ right: (remainQuantity_r / 10) + '%' }">
                            <img src="images/remaining_icon.png" alt="">
                            <br>Remaining: {{ remainQuantity_r }}
                          </span>
                        </p>
                        <p>0</p>
                      </div>
                    </div>
    
                    <div class="payment">
                      <div>
                        <p class="sub_t">Payment</p>
                        <p>{{ Number(paymentCurrencyAmountTypeR).toLocaleString() }} {{ paymentCurrencySymbolTypeR }}</p>
                      </div>
                      <div class="ck_box">
                        <p>
                          <label for="USDT_3">
                            <input type="radio" name="coin" id="USDT_3" value="0" v-model="r_mintCurrencySymbolIndex" @click="getTokenAmount(2, 0)" checked>
                            <span></span>
                            USDT
                          </label>
                        </p>
                        <p>
                          <label for="WTEC_3" @click="showComingSoonModal">
                            <input type="radio" name="coin" id="WTEC_3" value="1" v-model="r_mintCurrencySymbolIndex" @click="getTokenAmount(2, 1)" disabled>
                            <span></span>
                            WTEC
                          </label>
                        </p>
                      </div>
                    </div>
    
                    <button 
                      type="button"
                      :class="remainQuantity_r === 0 ? 'btn soldout' : 'btn minting'" 
                      @click="minting(2, r_mintCurrencySymbolIndex)"
                      :disabled="remainQuantity_r === 0 || !isButtonActive"
                    >
                      PAY
                    </button>
                  </div>
                </form>
              </div>
            </li>
  
            <li>
              <div class="img"><img src="images/red_NFT.png" alt=""></div>
              <div class="txt">
                <form action="">
                  <p class="price">NFT Price <b>$ 12,500</b></p>
    
                  <div class="inner">
                    <div class="name">
                      <p class="sub_t">NFT Name</p>
                      <p>BUMI BAND <img src="images/name_icon04.png" alt=""></p>
                    </div>
    
                    <div class="quantity">
                      <p class="sub_t">NFT Purchase quantity</p>
                      <p>1 <span>EA</span></p>
                    </div>
    
                    <div class="components">
                      <p class="sub_t">NFT Components</p>
                      <ul>
                        <li>WTEC</li>
                        <li>Alya 2</li>
                        <li>Fitri 4</li>
                        <li>3D Room</li>
                        <li>Bitcoin 350TH</li>
                      </ul>
                    </div>
    
                    <div class="sales">
                      <p class="sub_t">Sales Quantity</p>
                      <div class="percent">
                        <p>1,000</p>
                        <p class="bar">
                          <span :style="{ width: (remainQuantity_v / 10) + '%' }"></span>
                          <!-- span.number 가  right:100%면 span.number에 radius클래스 추가해야함 -->
                          <span class="number"
                          :class="{ 'radius': remainQuantity_v === 1000 }"
                          :style="{ right: (remainQuantity_v / 10) + '%' }">
                              <img src="images/remaining_icon.png" alt="">
                            <br>Remaining: {{ remainQuantity_v }}
                          </span>
                        </p>
                        <p>0</p>
                      </div>
                    </div>
    
                    <div class="payment">
                      <div>
                        <p class="sub_t">Payment</p>
                        <p>{{ Number(paymentCurrencyAmountTypeV).toLocaleString() }} {{ paymentCurrencySymbolTypeV }}</p>
                      </div>
                      <div class="ck_box">
                        <p>
                          <label for="USDT_4">
                            <input type="radio" name="coin" id="USDT_4" value="0" v-model="v_mintCurrencySymbolIndex" @click="getTokenAmount(3, 0)" checked>
                            <span></span>
                            USDT
                          </label>
                        </p>
                        <p>
                          <label for="WTEC_4" @click="showComingSoonModal">
                            <input type="radio" name="coin" id="WTEC_4" value="1" v-model="v_mintCurrencySymbolIndex" @click="getTokenAmount(3, 1)" disabled>
                            <span></span>
                            WTEC
                          </label>
                        </p>
                      </div>
                    </div>
    
                    <button 
                      type="button"
                      :class="remainQuantity_v === 0 ? 'btn soldout' : 'btn minting'" 
                      @click="minting(3, v_mintCurrencySymbolIndex)"
                      :disabled="remainQuantity_v === 0 || !isButtonActive"
                    >
                      PAY
                    </button>
                  </div>
                </form>
              </div>
            </li>
          </ul>
          
          <div class="selectNft">
            <h3>SELECT NFT MINTING</h3>

            <div :class="meNft.nftImgClass"></div>

            <div class="inner">
              <form action="">
                <div class="price_choice">
                  <div>
                    <button type="button" class="num1" @click="selectMeValue('me100')" :class="meNft.nftType == 'me100'? 'num1 on' : 'num1'">$ 100</button>
                    <p class="quantity">
                      <i class="xi-check"></i>Quantity sold <span>{{ soldQuantity_me100.toLocaleString() }}</span>
                    </p>
                  </div>
                  <div>
                    <button type="button" class="num2" @click="selectMeValue('me1500')" :class="meNft.nftType == 'me1500'? 'num2 on' : 'num2'">$ 1,500</button>
                    <p class="quantity">
                      <i class="xi-check"></i>Quantity sold <span>{{ soldQuantity_me1500.toLocaleString() }}</span>
                    </p>
                  </div>
                  <div>
                    <button type="button" class="num3" @click="selectMeValue('me10000')" :class="meNft.nftType == 'me10000'? 'num3 on' : 'num3'">$ 10,000</button>
                    <p class="quantity">
                      <i class="xi-check"></i>Quantity sold <span>{{ soldQuantity_me10000.toLocaleString() }}</span>
                    </p>
                  </div>
                </div>

                <div class="payment">
                  <div>
                    <p class="sub_t">Payment</p>
                    <p>{{ Number(meNft.nftAmount).toLocaleString() }} {{ meNft.paymentCurrencySymbolType }}</p>
                  </div>
                  <div class="ck_box">
                    <p>
                      <label for="USDT_5">
                        <input type="radio" name="coin" id="USDT_5" checked="">
                        <span></span>
                        USDT
                      </label>
                    </p>
                    <p>
                      <label for="WTEC_5"  @click="showComingSoonModal">
                        <input type="radio" name="coin" id="WTEC_5" disabled="">
                        <span></span>
                        WTEC
                      </label>
                    </p>
                  </div>

                  <button
                      type="button"
                      :class="nftTypeList[meNft.nftTypeIndex]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                      @click="minting(meNft.nftTypeIndex, meNft.mintCurrencySymbolIndex)"
                  >
                    PAY
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p class="infoTxt"><i class="xi-error"></i> WTEC coin payments will be supported soon.</p>
        </div>
      </div>
    </div>

    <div id="sec02">
      <div class="bg bg1"><img src="images/sec02_bg01.png" alt=""></div>
      <div class="bg bg2"><img src="images/sec02_bg02.png" alt=""></div>

      <div>
        <div class="logo" data-aos="fade-up" data-aos-delay="100"><img src="images/sec02_logo.png" alt=""></div>
        <div class="txt" data-aos="fade-up" data-aos-delay="200">
          <p>Establishing a metaverse for trade exchange <br>with overseas companies</p>
          <h3>Experience the expanded WTEC.</h3>
          <p>The price of the purchased NFT is divided over 1000 days <br>and WTEC coins are paid every day.</p>
        </div>
        <div class="btn_group">
          <div>
            <a href="https://www.wtec-usa.com" target="_blank" data-aos="fade-up" data-aos-delay="300">WTEC Website<img src="images/more_icon.png" alt=""></a>
          </div>
          <div>
            <a href="https://oncyber.io/crypto-trap-house" target="_blank" data-aos="fade-up" data-aos-delay="300">3D Room Metaverse<img src="images/more_icon.png" alt=""></a>
          </div>
        </div>
      </div>
    </div>

    <div id="sec03">
      <div class="img">
        <img class="pc" src="images/sec03_img.png" alt="">
        <img class="mo" src="images/sec03_img-mo.png" alt="">
        <div>
          <div class="inner" data-aos="fade-up" data-aos-delay="100">
            <span>Real-World Assets</span>
            <h3>Bumi band RWA</h3>
            <b>The first real asset-based <span>Bumi band dividend NFT</span></b>
            <p>Leading innovation in the global market and digital <br>
              innovation in real-world assets.</p>
          </div>
        </div>
      </div>

      <div class="sw">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <q-carousel
                animated
                autoplay
                transition-prev="slide-right"
                transition-next="slide-left"
                swipeable
                height="830px"
                v-model="slide"
                style="background: transparent; width: 100%;"
                data-aos="fade-up" data-aos-delay="200"
              >
                <q-carousel-slide name="first">
                  <div class="contents">
                    <div class="photo"><img src="images/sec03_img2.png" alt=""></div>

                    <div class="txt">
                      <span>Lippo Siloam</span>
                      <h3>After taking office as <br>hospital president</h3>

                      <p><b>6</b> branches</p>
                      <p><i class="xi-long-arrow-right"></i> <b>41</b> branches <b>Expanded</b></p>
                      <small>Indonesian mythological figures</small>

                      <div class="link">
                        <a href="https://www.snowseed.io/drops_view" target="_blank">ALYA  NFT Benefits <img src="images/more_icon.png" alt=""></a>
                        <a href="https://www.snowseed.io/drops_view2" target="_blank">FITRI NFT Benefits <img src="images/more_icon.png" alt=""></a>
                      </div>
                    </div>
                  </div>
                </q-carousel-slide>
                <q-carousel-slide name="second">
                  <div class="contents">
                    <div class="photo"><img src="images/sec03_img3.png" alt=""></div>

                    <div class="txt">
                      <span>Indonesia <br>Siloam Cancer Center</span>
                      <h3>30,000 cancer patients waiting each year</h3>
                      <small class="small2">In Indonesia, obtaining a cancer hospital license
                        <br>Quite difficult and time consuming</small>

                      <div class="link">
                        <a href="https://www.snowseed.io/drops_view" target="_blank">ALYA NFT Benefits <img src="images/more_icon.png" alt=""></a>
                        <a href="https://www.snowseed.io/drops_view2" target="_blank">FITRI NFT Benefits <img src="images/more_icon.png" alt=""></a>
                      </div>
                    </div>
                  </div>
                </q-carousel-slide>
                <q-carousel-slide name="third">
                  <div class="contents">
                    <div class="photo"><img src="images/sec03_img4.png" alt=""></div>

                    <div class="txt">
                      <span>Obtained 27 licenses</span>
                      <h3>for Siloam Cancer Center, <br>the largest in Indonesia</h3>
                      <small class="small2">A new and clear investment opportunity in Indonesia! 
                        <br>Stable, high-profit cancer hospital investment project</small>

                      <div class="link">
                        <a href="https://www.snowseed.io/drops_view" target="_blank">ALYA NFT Benefits <img src="images/more_icon.png" alt=""></a>
                        <a href="https://www.snowseed.io/drops_view2" target="_blank">FITRI NFT Benefits <img src="images/more_icon.png" alt=""></a>
                      </div>
                    </div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
          </div>
          <div class="sec03-button-prev sw-btn" @click="goLeftCarousel"><i class="xi-angle-left"></i></div>
          <div class="sec03-button-next sw-btn" @click="goRightCarousel"><i class="xi-angle-right"></i></div>
        </div>
      </div>
    </div>

    <div id="sec04">
      <div>
        <div class="img img1"><img src="images/sec04_img.png" alt=""></div>
        <div class="img img2"><img src="images/sec04_deco.png" alt=""></div>

        <div class="txt" data-aos="fade-up" data-aos-delay="100">
          <span><img src="images/sec04_logo.png" alt=""></span>
          <p>Investing in Bitcoin</p>
          <b>The easiest way is</b>
          <h3>Investing in Bitcoin</h3>
        </div>
      </div>
    </div>

    <div id="sec05">
      <section class="sec01">
        <div>
          <h3 data-aos="fade-up" data-aos-delay="100">Special benefits for <br>Bumi band membership!</h3>
          <p data-aos="fade-up" data-aos-delay="100">Membership benefits allow holders of Bumi band NFT <br>
            to use hotels at special prices.</p>
  
          <div class="img" data-aos="fade-up" data-aos-delay="200">
            <img src="images/sec05_img01.jpg" alt="">
            <img src="images/sec05_img02.jpg" alt="">
          </div>
  
          <h5 class="mail" data-aos="fade-up" data-aos-delay="300">
            For membership reservations, <br>please contact Bumi band.
            <!-- <p>
              <i class="xi-mail"></i>
              <span data-clipboard-text="snowseed_business@gaudilabs.io"  @click="copyValue('snowseed_business@gaudilabs.io')">snowseed_business@gaudilabs.io</span>
            </p> -->
          </h5>
        </div>
      </section>

      <section class="sec02">
        <h3 data-aos="fade-up" data-aos-delay="100"><small>RWA NFT Project</small> Bumi band's <strong>Premium Membership</strong></h3>
        <p class="desc" data-aos="fade-up" data-aos-delay="100">
          "I can’t tell you that life will be easy, <br>but I can at least tell you that life is worth living."
        </p>
        <hr>
        <div class="flex desc2" data-aos="fade-up" data-aos-delay="200">
          <div>
            The premium membership of the Bumi band RWA NFT project goes beyond a simple 
            service, It is a journey to realize the value of life and explore new possibilities. Inheriting 
            Satoshi Nakamoto's vision, we create experiences that bring true meaning to each 
            individual's life at the intersection of technology and the human spirit. Our 
            membership embodies the shared values of Web 3.0, helps you spend your time on 
            things that matter, and takes social interaction to a new level.
          </div>
          <div>
            From regular holders to VIP holders, Bumi band's membership offers unique and 
            customized benefits that improve and enhance each member's life. This can range from 
            luxury hotel accommodations to exclusive events, networking opportunities and in-depth 
            training sessions. With Bumi band, your world becomes wider, your relationships deepen, 
            and your life becomes richer. All of this is possible with one membership. Open a new 
            future with Bumi band now.
          </div>
        </div>

        <h4 data-aos="fade-up" data-aos-delay="300">Bumi band Membership Service</h4>
        <div class="flex service" data-aos="fade-up" data-aos-delay="300">
          <div>
            <div class="box">
              <p class="num">Service 1</p>
              <p class="icon"><img src="images/sec05_icon01.png" alt=""></p>
              <p class="title"><strong>Innovative spirit</strong></p>
              <p class="desc">Inheriting the spirit of Satoshi Nakamoto’s <br>‘Cypherpunk’, realizing web3’s shared values.</p>
            </div>
          </div>
          <div>
            <div class="box">
              <p class="num">Service 2</p>
              <p class="icon"><img src="images/sec05_icon02.png" alt=""></p>
              <p class="title"><strong>Membership benefits</strong></p>
              <p class="desc">Customized benefits and premium experiences <br>are provided from regular holders to VIP holders.</p>
            </div>
          </div>
          <div>
            <div class="box">
              <p class="num">Service 3</p>
              <p class="icon"><img src="images/sec05_icon03.png" alt=""></p>
              <p class="title"><strong>Improving quality of life</strong></p>
              <p class="desc">Helps increase the value of life and ensure <br>time is spent on worthwhile things.</p>
            </div>
          </div>
          <div>
            <div class="box">
              <p class="num">Service 4</p>
              <p class="icon"><img src="images/sec05_icon04.png" alt=""></p>
              <p class="title"><strong>A unique experience</strong></p>
              <p class="desc">
                A variety of experiences including luxury hotel
                <br>accommodations, exclusive events, networking
                <br>opportunities, training sessions and more.
              </p>
            </div>
          </div>
          <div>
            <div class="box">
              <p class="num">Service 5</p>
              <p class="icon"><img src="images/sec05_icon05.png" alt=""></p>
              <p class="title"><strong>Inclusive Community</strong></p>
              <p class="desc">Encourages interaction between users and <br>helps build meaningful relationships.</p>
            </div>
          </div>
          <div>
            <div class="box">
              <p class="num">Service 6</p>
              <p class="icon"><img src="images/sec05_icon06.png" alt=""></p>
              <p class="title"><strong>Future-oriented approach</strong></p>
              <p class="desc">Exploring new possibilities through the <br>combination of technology and the human spirit.</p>
            </div>
          </div>
        </div>

        <h5 class="mail" data-aos="fade-up" data-aos-delay="400">
          For membership reservations, <br>please contact Bumi band.
          <!-- <p>
            <i class="xi-mail"></i>
            <span data-clipboard-text="snowseed_business@gaudilabs.io" @click="copyValue('snowseed_business@gaudilabs.io')">snowseed_business@gaudilabs.io</span>
          </p> -->
        </h5>
      </section>
    </div>
  </div>

  <div class="footer">
    <div class="top">
      <div class="nation">
        <a @click="selectNation('idn')"><img src="images/india.png" alt=""></a>
        <a @click="selectNation('')" class="current"><img src="images/usa.png" alt=""></a>
        <a @click="selectNation('kor')"><img src="images/korea.png" alt=""></a>
      </div>
  
      <p class="info">
        <b>PURCHASE AND PARTNERSHIP INQUIRY</b>
        <i class="xi-mail"></i><span data-clipboard-text="Sale_info@bumiband.com" @click="copyValue('Sale_info@bumiband.com')">Sale_info@bumiband.com</span>
      </p>
    </div>
    <p class="copyright">COPYRIGHT © 2024 PT. COOP WORLD INDONESIA. ALL RIGHTS RESERVED.</p>
  </div>

  <WalletModal ref="refWalletModal"/>
  <ComingSoonModal ref="refComingSoonModal"/>
  <MintingModal ref="refMintingModal" @callback-minting="handleDoMinting"/>
  <MintingApplyModal ref="refMintingApplyModal" @callback-applyMinting="handleDoPay"/>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import wait from 'waait'
import { QSpinnerGears } from 'quasar'
import bs58 from "bs58"
//BNB
import Web3 from 'web3';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';
import BN from 'bn.js'; // BN 모듈 직접 import
import { route } from 'quasar/wrappers'
//

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      isRefundTarget: false, // 환불 대상 여부 : 결제가 정상적으로 완료되는 동시에 환불 대상으로 인식함.
      smallSize: false,
      currentMenu: false,
      popUp: true,
      isOpen: false,
      projectSeq: 1,
      mintAmount: 1, // 일단 지금은 1개로 고정
      nftTypeList: [],
      selectedNftTypeIndex: 0,
      selectedNftPriceIndex: 0,
      selectedNftImage: '',
      selectedNftTypeName: '',
      a_mintCurrencySymbolIndex: 0,
      s_mintCurrencySymbolIndex: 0,
      r_mintCurrencySymbolIndex: 0,
      v_mintCurrencySymbolIndex: 0,
      me100_mintCurrencySymbolIndex: 0,
      me1500_mintCurrencySymbolIndex: 0,
      me10000_mintCurrencySymbolIndex: 0,
      payCurrencyAmountTotal: 0, // 총 결제금액
      payCurrencySymbol: 'USDT', // 결제 토큰 심볼
      refundCurrencyAmount: 0, // 환불금액

      paymentCurrencyAmountTypeA: '1250',
      paymentCurrencyAmountTypeS: '2500',
      paymentCurrencyAmountTypeR: '5000',
      paymentCurrencyAmountTypeV: '12500',
      paymentCurrencyAmountTypeMe100: '100',
      paymentCurrencyAmountTypeMe1500: '1500',
      paymentCurrencyAmountTypeMe10000: '10000',
      paymentCurrencySymbolTypeA: 'USDT',
      paymentCurrencySymbolTypeS: 'USDT',
      paymentCurrencySymbolTypeR: 'USDT',
      paymentCurrencySymbolTypeV: 'USDT',
      paymentCurrencySymbolTypeMe100: 'USDT',
      paymentCurrencySymbolTypeMe1500: 'USDT',
      paymentCurrencySymbolTypeMe10000: 'USDT',
      soldQuantity_me100: 0,
      soldQuantity_me1500: 0,
      soldQuantity_me10000: 0,
      remainQuantity_a: 0,
      remainQuantity_s: 0,
      remainQuantity_r: 0,
      remainQuantity_v: 0,
      nftInfoVo: null,

      meNft: {
        nftType: 'me100',
        nftAmount: '100',
        paymentCurrencySymbolType: 'USDT',
        mintCurrencySymbolIndex: 0,
        nftTypeIndex: 4,
        nftImgClass: 'nftImg nftImg_1',
      },


      nftTypeIndex: null,
      mintCurrencySymbolIndex: null,
      dialogTimer: null,
      countdownSeconds: 30, // 초기 팝업 열리면서 30초로 설정
      projectVo: {
        seq: '',
        project_id: '',
        project_symbol: '',
        project_name: '',
        project_name_ko: '',
        mainnet: '',
        contract_address: '',
        json_path: '',
        admin_wallet_address: '',
        fee_wallet_address: '',
        listing_wallet_address: '',
        listing_wallet_secret_key: '',
        fee_wallet_secret_key: '',
        image_url: '',
        description: '',
        description_ko: '',
        mint_start_block: '',
        mint_end_block: '',
        mint_start_time: '',
        mint_end_time: '',
        creator_fee: 0,
        reg_id: '',
        reg_time: '',
        mod_id: '',
        mod_time: '',
        del_id: '',
        del_time: '',
      },
      modalData: {
        quantityA: '',
        quantityS: '',
        quantityR: '',
        quantityV: '',
        quantityMe100: '',
        quantityMe1500: '',
        quantityMe10000: '',
        total: '',
      },
      solanaWalletAddress: '',
      slide: 'first', // sec03에서 DR. ANANG swipe slide - carousel
    }
  },
  components: {
  },
  watch: {
    '$route.hash'(newHash) {
      this.scrollToSection(newHash.substring(1))
    }
  },
  computed: {
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    getWalletAddressShort () {
      const address = this.$store.getters.getWalletAddress
      if (address) {
        return address.substr(0, 6) + '...' + address.substr(address.length - 4, address.legnth)
      } else {
        return address
      }
    },
    getWalletAddressLast () {
      const address = this.$store.getters.getWalletAddress
      if (address) {
        return '...' + address.substr(address.length - 4, address.legnth)
      } else {
        return address
      }
    },
    getSolanaWalletType () {
      return this.$store.getters.getSolanaWalletType
    },
    // getSolanaWalletAddress () {
    //   return this.$store.getters.getSolanaWalletAddress
    // },
    // getSolanaWalletAddressLast () {
    //   const address = this.$store.getters.getSolanaWalletAddress
    //   if (address) {
    //     return '...' + address.substr(address.length - 4, address.legnth)
    //   } else {
    //     return address
    //   }
    // },
    isButtonActive () {
      const startTime = new Date(this.projectVo.mint_start_time)
      const endTime = new Date(this.projectVo.mint_end_time)

      // 현재 시간 가져오기
      const now = new Date()
      
      // 현재 시간이 설정한 범위 내에 있는지 확인
      return now >= startTime && now < endTime
    }
  },
  created: function () {
    // console.log(this.$q.platform.is.mobile)
    const walletAddress = localStorage.getItem('WALLETADDRESS') ? localStorage.getItem('WALLETADDRESS') : this.$cookie.get('walletAddress')
    const walletType = localStorage.getItem('WALLETTYPE') ? localStorage.getItem('WALLETTYPE') : this.$cookie.get('walletType')
    if (walletAddress && walletType) {
      this.$store.dispatch('setWalletType', walletType)
      this.$store.dispatch('setWalletAddress', walletAddress)
    }

    const solanaWalletAddress = localStorage.getItem('SOLANAWALLETADDRESS') ? localStorage.getItem('SOLANAWALLETADDRESS') : this.$cookie.get('solanaWalletAddress')
    const solanaWalletType = localStorage.getItem('SOLANAWALLETTYPE') ? localStorage.getItem('SOLANAWALLETTYPE') : this.$cookie.get('solanaWalletType')
    if (solanaWalletAddress && solanaWalletType) {
      this.$store.dispatch('setSolanaWalletType', solanaWalletType)
      this.$store.dispatch('setSolanaWalletAddress', solanaWalletAddress)
    }

    // // CORDOVA APP인 경우, /app/loginApp 화면으로 이동
    // if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && location.origin !== this.$frontDomain
    //   // && this.$q.platform.is.mobile === true && (this.$q.platform.is.platform === 'andriod' || this.$q.platform.is.platform === 'ios')
    // ) {
    //   this.$router.push('/app/loginApp')
    //   // https://nftpy.io WEB으로 이동
    //   // alert('move to https://nftpy.io')
    //   // if (location.origin !== this.$domain) {
    //   //   location.href = this.$domain
    //   // }
    // }

    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }


    // nft_type 조회
    this.selectNftTypeList(this.projectSeq)

    // project start time 조회용
    this.selectProject()

    // me 시리즈 판매수량 조회
    this.selectPaymentMeQuantitySold()

    // 해당 민팅 페이지로 이동
    // this.$router.push('/beastar1')
    // this.$router.push('/beastar2')

  },
  destroy: function () {
    window.removeEventListener("resize", this.resizeEventHandler)
  },
  mounted: function () {
    if (this.$q.platform.is.desktop) {
      if (window.ethereum) {
        // 지갑주소 변경 이벤트 구독
        window.ethereum?.on('accountsChanged', this.walletAccountsChangedMetamask)
        // 체인 변경 이벤트 구독
        window.ethereum?.on('chainChanged', this.handleChainChangedMetamask)
      }
    }

    AOS.init()

    this.checkPopUpStatus()

    this.scrollToSection(this.$route.hash.substring(1))

  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    goLeftCarousel() {
      // console.log('goLeftCarousel')
      if (this.slide == 'third') {
        this.slide = 'second'
      } else if (this.slide == 'second') {
        this.slide = 'first'
      }
    }, 
    goRightCarousel() {
      // console.log('goRightCarousel')
      if (this.slide == 'first') {
        this.slide = 'second'
      } else if (this.slide == 'second') {
        this.slide = 'third'
      }
    },
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    selectNation(country) {
      this.$router.push('/'+ country)
    },
    resizeEventHandler() {
      // console.log('resizeEventHandler')
      // console.log(document.body.offsetWidth)
      if (this.$q.platform.is.mobile || this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || document.body.offsetWidth < 1024) {
        this.smallSize = true
      } else {
        this.smallSize = false
      }
    },
    goMypage() {
      if (!this.getWalletAddress) {
        this.$noti(this.$q, this.$t('connect_your_wallet'))
        return
      }
      this.$router.push('/mypage')
    },
    checkPopUpStatus() {
      const lastClosed = localStorage.getItem('popupClosedTimestamp')
      if (lastClosed) {
        const now = new Date().getTime()
        const oneDay = 24 * 60 * 60 * 1000
        if (now - lastClosed < oneDay) {
          this.popUp = false
        }
      }
    },
    closeForDay() {
      const now = new Date().getTime()
      localStorage.setItem('popupClosedTimestamp', now)
      this.popUp = false
    },
    closePopUp() {
      this.popUp = false
    },
    showComingSoonModal() {
      this.$refs.refComingSoonModal.show()
    },
    handleMintingClick(index, mintCurrencySymbolIndex) {
      if (this.getWalletAddress) {
        this.minting(index, mintCurrencySymbolIndex)
      } else {
        this.showWalletModal()
      }
    },
    showWalletModal() {
      this.$refs.refWalletModal.show()
    },
    showDisconnectWalletModal() {
      this.$refs.refdisconnectWalletModal.show()
    },
    showMintingModal() {
      this.$refs.refMintingModal.payCurrencyAmountTotal = this.payCurrencyAmountTotal
      this.$refs.refMintingModal.payCurrencySymbol = this.payCurrencySymbol
      this.$refs.refMintingModal.selectedNftTypeImage = this.selectedNftTypeImage
      this.$refs.refMintingModal.selectedNftTypeName = this.selectedNftTypeName
      // this.$refs.refMintingModal.paymentCurrencyAmountTypeA = this.paymentCurrencyAmountTypeA
      // this.$refs.refMintingModal.paymentCurrencyAmountTypeS = this.paymentCurrencyAmountTypeS
      // this.$refs.refMintingModal.paymentCurrencyAmountTypeR = this.paymentCurrencyAmountTypeR
      // this.$refs.refMintingModal.paymentCurrencyAmountTypeV = this.paymentCurrencyAmountTypeV
      // this.$refs.refMintingModal.paymentCurrencyAmountTypeMe100 = this.paymentCurrencyAmountTypeMe100
      // this.$refs.refMintingModal.paymentCurrencyAmountTypeMe1500 = this.paymentCurrencyAmountTypeMe1500
      // this.$refs.refMintingModal.paymentCurrencyAmountTypeMe10000 = this.paymentCurrencyAmountTypeMe10000

      this.$refs.refMintingModal.show()
    },
    async handleDoMinting(data) {
      this.modalData = data
      console.log('===================== data')
      console.log(data)

      // 20240706_1211 솔라나 입력 팝업화면 없애고 마이페이지에서 등록하는 방식으로 수정 START
      // if(this.modalData.quantityMe100 == '1' || this.modalData.quantityMe1500 == '1' || this.modalData.quantityMe10000 == '1') {
      //   this.doPayment()
      // } else {
      //   //minting apply modal
      //   this.showMintingApplyModal()
      // }
      await this.doPayment()
      // 20240706_1211 솔라나 입력 팝업화면 없애고 마이페이지에서 등록하는 방식으로 수정 END
      this.quantityRefresh()
    },
    showMintingApplyModal() {
      this.$refs.refMintingApplyModal.payCurrencySymbol = this.payCurrencySymbol
      this.$refs.refMintingApplyModal.show()
    },
    handleDoPay(data) {
      this.solanaWalletAddress = data
      this.doPayment()
    },
    selectMeValue(meType) {
      this.meNft.nftType = meType

      if (meType == 'me100') {
        this.meNft.nftAmount = '100'
        this.meNft.nftTypeIndex = 4
        this.meNft.nftImgClass = 'nftImg nftImg_1'
      } else if (meType == 'me1500'){
        this.meNft.nftAmount = '1500'
        this.meNft.nftTypeIndex = 5
        this.meNft.nftImgClass = 'nftImg nftImg_2'
      } else {
        this.meNft.nftAmount = '10000'
        this.meNft.nftTypeIndex = 6
        this.meNft.nftImgClass = 'nftImg nftImg_3'
      }
    },
    selectProject() {
      const param = {
        seq: this.projectSeq,
      }
      this.$axios.get('/api/project/selectProject', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            this.projectVo = result.data
            console.log(this.projectVo)
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // nft_type 리스트 조회
    selectNftTypeList(projectSeq) {
      const paramsNftType = {
        projectSeq: projectSeq,
      }
      this.$axios.get('/api/nfttype/selectNftTypeList', {params: paramsNftType})
        .then((result) => {
          // console.log(result.data)
          if (result && result.data) {
            this.nftTypeList = result.data


            // nftTypeList 루프 - nft_price 리스트 조회
            for (let i = 0; i < this.nftTypeList.length; i++) {
              let nftTypeObject = this.nftTypeList[i]

              // nft_price 리스트 조회
              const paramsNftPrice = {
                projectSeq: nftTypeObject.project_seq,
                nftTypeSeq: nftTypeObject.seq,
              }
              this.$axios.get('/api/nftprice/selectNftPriceList', {params: paramsNftPrice})
                .then((result) => {
                  // console.log(result.data)
                  if (result && result.data) {
                    nftTypeObject.nftPriceList = result.data
                  } else {
                    nftTypeObject.nftPriceList = []
                    // this.$noti(this.$q, this.$t('no_data_nft_type_list'))
                  }
                })
                .catch((error) => {
                  console.error(error)
                })
            }

          } else {
            this.nftTypeList = []
            this.$noti(this.$q, this.$t('no_data_nft_type_list'))
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    // Payment 토큰 가격 설정
    async getTokenAmount(nftTypeIndex, nftPriceIndex) {
      this.$q.loading.show()

      try {
        // const nftTypeVo = this.nftTypeList[nftTypeIndex]
        const nftPriceVo = this.nftTypeList[nftTypeIndex].nftPriceList[nftPriceIndex]

        // 토큰 수량 계산
        let tokenAmount = 0
        if (nftPriceVo.is_usd_value == 1) {
          tokenAmount = await this.getTokenAmountByUsdValue(nftPriceVo.price_usd)
        } else {
          tokenAmount = nftPriceVo.price_currency
        }

        // 가격 설정
        if (nftTypeIndex == 0) {
          this.paymentCurrencyAmountTypeA = tokenAmount
          this.paymentCurrencySymbolTypeA = nftPriceVo.currency_symbol
        } else if (nftTypeIndex == 1) {
          this.paymentCurrencyAmountTypeS = tokenAmount
          this.paymentCurrencySymbolTypeS = nftPriceVo.currency_symbol
        } else if (nftTypeIndex == 2) {
          this.paymentCurrencyAmountTypeR = tokenAmount
          this.paymentCurrencySymbolTypeR = nftPriceVo.currency_symbol
        } else if (nftTypeIndex == 3) {
          this.paymentCurrencyAmountTypeV = tokenAmount
          this.paymentCurrencySymbolTypeV = nftPriceVo.currency_symbol
        }

        console.log(nftPriceVo.currency_symbol)

        // 결제 정보 설정
        this.payCurrencyAmountTotal = tokenAmount
        this.payCurrencySymbol = nftPriceVo.currency_symbol
      } catch(e) {
        console.error(e)
      }

      this.$q.loading.hide()
    },
    // WTEC Amount 구하기
    async getTokenAmountByUsdValue(usdValue) {
      const usdPrice = await this.getTheLatestPriceOfTheTradingPair()
      console.log(usdPrice + '  @#@#@#  usdPrice')
      console.log(usdValue + '  @#@#@#  usdValue')

      if (!usdPrice || usdPrice == 0) {
        return 0
      }
      const currencyAmount = Math.ceil(usdValue / usdPrice)
      // 소수점 처리
      console.log(currencyAmount + '  @#@#@#  currencyAmount')

      return currencyAmount
    },
    // 시세 조회
    async getTheLatestPriceOfTheTradingPair(targetTokenSymbol) {
      // try {
        if (!targetTokenSymbol) {
          targetTokenSymbol = 'WTEC'
        }
        const param = {
          tokenSymbol: targetTokenSymbol,
        }
        const result = await this.$axios.get('/api/indodax/getIndodaxTokenPrice', { params: { ...param }})
        // console.log(resultKeyValue.data)
        if (result && result.data) {
          return result.data
        } else {
          this.$noti(this.$q, this.$t('no_data_indodax_token_price'))
          return 0
        }
    },
    // me 시리즈 팔린 수량 체크
    async selectPaymentMeQuantitySold() {
      try {
        const result = await this.$axios.get('/api/payment/selectPaymentMeQuantitySold')
        if(result && result.data){
          this.soldQuantity_me100 = result.data.total_quantity_me100
          this.soldQuantity_me1500 = result.data.total_quantity_me1500
          this.soldQuantity_me10000 = result.data.total_quantity_me10000
          this.remainQuantity_a = 1000 - result.data.total_quantity_a
          this.remainQuantity_s = 1000 - result.data.total_quantity_s
          this.remainQuantity_r = 1000 - result.data.total_quantity_r
          this.remainQuantity_v = 1000 - result.data.total_quantity_v
        }
      } catch(e) {
        console.error(e)
      }
    },
    // 수량 재설정
    quantityRefresh() {
      // me 시리즈 팔린 수량 체크
      this.selectPaymentMeQuantitySold()
    },
    // 민팅 실행전 체크
    async minting(nftTypeIndex, mintCurrencySymbolIndex) {

      console.log('nftTypeIndex: ' + nftTypeIndex)
      console.log('mintCurrencySymbolIndex: ' + mintCurrencySymbolIndex)


      // 지갑 연결 체크
      if (!this.getWalletType || !this.getWalletAddress) {
        // connect metamask 안한 경우
        // this.connectMetaMaskWallet()
        this.$noti(this.$q, this.$t('parameter_check_failed_wallet_metamask'))
        return
      }

      // 체크 결과
      let checkResult = true

      // 파라미터 체크
      if (!this.projectSeq) {
        this.$noti(this.$q, this.$t('parameter_check_failed_project_seq'))
        checkResult = false
      }
      // if (!this.getWalletType || this.getWalletType == undefined) {
      //   this.$noti(this.$q, this.$t('parameter_check_failed_wallet_type'))
      //   checkResult = false
      // }
      // if (!this.getWalletAddress) {
      //   this.$noti(this.$q, this.$t('parameter_check_failed_wallet_address'))
      //   checkResult = false
      // }
      // if (!this.getSolanaWalletType || this.getSolanaWalletType == undefined) {
      //   this.$noti(this.$q, this.$t('parameter_check_failed_solana_wallet_type'))
      //   checkResult = false
      // }
      // if (!this.getSolanaWalletAddress) {
      //   this.$noti(this.$q, this.$t('parameter_check_failed_solana_wallet_address'))
      //   checkResult = false
      // }
      // if (!nftTypeIndex) {
      //   this.$noti(this.$q, this.$t('parameter_check_failed_nft_type'))
      //   checkResult = false
      // }
      // if (!this.mintAmount) {
      //   this.$noti(this.$q, this.$t('parameter_check_failed_mint_amount'))
      //   checkResult = false
      // }
      // if (!this.mintCurrencySymbolIndex) {
      //   this.$noti(this.$q, this.$t('parameter_check_failed_currency_symbol'))
      //   checkResult = false
      // }

      if (!checkResult) {
        // 체크 결과 실패인 경우 리턴
        return
      }
      
      const nftTypeObject = this.nftTypeList[nftTypeIndex]
      const nftPriceObject = nftTypeObject.nftPriceList[mintCurrencySymbolIndex]
      if (nftPriceObject.is_usd_value == 0) {
        // 결제 통화가 USDT인 경우
        this.payCurrencyAmountTotal = nftPriceObject.price_currency * this.mintAmount
      } else {
        // 결제 통화가 WTEC인 경우
        // this.getTokenAmount 내에서 this.payCurrencyAmountTotal를 설정하고 있음
        await this.getTokenAmount(nftTypeIndex, mintCurrencySymbolIndex)
        // this.payCurrencyAmountTotal = this.getTokenAmount(nftTypeIndex, mintCurrencySymbolIndex)
      }
      this.payCurrencySymbol = nftPriceObject.currency_symbol

      // TODO: 민팅 확인 팝업화면 표시 -> 확인 클릭시 doMinting 실행 (아래에 민팅 처리 실행은 주석처리)
      
      this.selectedNftTypeIndex = nftTypeIndex
      this.selectedNftPriceIndex = mintCurrencySymbolIndex
      // 선택한 nft 이미지, 이름 세팅
      this.selectedNftTypeImage = nftTypeObject.image_url
      this.selectedNftTypeName = nftTypeObject.nft_type_name
      

      // 민팅 확인 팝업화면 표시
      this.showMintingModal()

      // 민팅 처리 실행
      // this.doMinting(nftTypeIndex, mintCurrencySymbolIndex)
    },
    // 결제 실행
    async doPayment() {
      // nft_price 설정
      const nftPriceVo = this.nftTypeList[this.selectedNftTypeIndex].nftPriceList[this.selectedNftPriceIndex]

      let selectedProjectSeq = null
      if(this.selectedNftTypeIndex == 0 || this.selectedNftTypeIndex == 1 || this.selectedNftTypeIndex == 2 || this.selectedNftTypeIndex == 3){
        selectedProjectSeq = 1
      } else {
        selectedProjectSeq = this.selectedNftTypeIndex
      }

      // 프로젝트 admin wallet address 검색
      const param = {
        seq: selectedProjectSeq,
      }
      const selectedProjectResult = await this.$axios.get('/api/project/selectProject', { params: { ...param }})
      if(!selectedProjectResult) {
        this.$noti(this.$q, this.$t('process_failed') + ': selectProject')
        return
      }

      // 결제 진행
      this.$q.loading.show() // 로딩 표시 시작
      try {
        // 1. 결제 처리
        const paymentReturnVo = await this.transferBNBCoin(nftPriceVo.currency_contract, this.payCurrencyAmountTotal, selectedProjectResult.data.admin_wallet_address)
        if (!paymentReturnVo) {
          this.$noti(this.$q, this.$t('process_failed') + ': paymentReturnVo is null')
        }
        // 처리 완료 메시지 표시
        if (paymentReturnVo.returnCd == 0) {
          this.$noti(this.$q, this.$t('application_completed'))

          // 2. 결제정보 등록
          const paramPayment = {
            // project_seq: this.projectSeq,
            project_seq: this.nftTypeList[this.selectedNftTypeIndex].project_seq,
            wallet_address_from: this.getWalletAddress,
            wallet_type_from: this.getWalletType,
            wallet_address_to: this.solanaWalletAddress,
            wallet_type_to: 'phantom',
            currency_symbol: this.payCurrencySymbol,
            currency_amount_total: this.payCurrencyAmountTotal,
            quantity_a: this.modalData.quantityA,
            quantity_s: this.modalData.quantityS,
            quantity_r: this.modalData.quantityR,
            quantity_v: this.modalData.quantityV,
            quantity_me100: this.modalData.quantityMe100,
            quantity_me1500: this.modalData.quantityMe1500,
            quantity_me10000: this.modalData.quantityMe10000,
            price_a: this.modalData.subtotalA,
            price_s: this.modalData.subtotalS,
            price_r: this.modalData.subtotalR,
            price_v: this.modalData.subtotalV,
            price_me100: this.modalData.subtotalMe100,
            price_me1500: this.modalData.subtotalMe1500,
            price_me10000: this.modalData.subtotalMe10000,
            subtotal_a: this.modalData.subtotalA,
            subtotal_s: this.modalData.subtotalS,
            subtotal_r: this.modalData.subtotalR,
            subtotal_v: this.modalData.subtotalV,
            subtotal_me100: this.modalData.subtotalMe100,
            subtotal_me1500: this.modalData.subtotalMe1500,
            subtotal_me10000: this.modalData.subtotalMe10000,
            tx_id: paymentReturnVo.tx_id,
            reg_id: this.getWalletAddress,
          }
          const resultPayment = await this.$axios.post('/api/payment/insertPayment', paramPayment)
          // console.log(result.data)
          if (!resultPayment || !resultPayment.data || resultPayment.data.returnCd != 0) {
            this.$noti(this.$q, this.$t('process_failed') + ': insertPayment')
          }

          /////////////////////////////////////////////////////////////////////////////////////////////
          // NFT 타입 nft_type 테이블에 amount_remain - 1 update
          /////////////////////////////////////////////////////////////////////////////////////////////
          const paramNftTypeRemainUpdate = {
            seq: this.nftTypeList[this.selectedNftTypeIndex].seq,
            mod_id: this.getWalletAddress,
          }
          const resultNftTypeRemainUpdate = await this.$axios.post('/api/nfttype/updateNftTypeRemainCount', paramNftTypeRemainUpdate)
          // console.log(resultNftTypeRemainUpdate.data)
          if (!resultNftTypeRemainUpdate || !resultNftTypeRemainUpdate.data || resultNftTypeRemainUpdate.data.returnCd != 0) {
            this.$noti(this.$q, this.$t('process_failed') + ': updateNftTypeRemainCount')
          }

        } else {
          this.$noti(this.$q, 'ERROR CODE: ' + paymentReturnVo.returnCd + ' - ' + paymentReturnVo.returnMsg)
        }
        this.$q.loading.hide() // 로딩 표시 종료
      } catch (e) {
        this.$q.loading.hide() // 로딩 표시 종료
      }
    },
    // 환불
    async refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount) {
      console.log('■■■■■■■ refund ■■■■■■■ START')
      this.isRefundTarget = false // 환불 대상 여부 초기화
      /////////////////////////////////////////////////////////////////
      // 환불 처리
      /////////////////////////////////////////////////////////////////
      let txid = 'refundtxidxxxxxxxxxxxxxxxxxxxxxxxxxxx'

      /////////////////////////////////////////////////////////////////
      // refund_log 테이블에 환불정보 등록
      /////////////////////////////////////////////////////////////////
      const paramRefundLog = {
        project_seq: projectSeq,
        wallet_address: walletAddress,
        wallet_type: walletType,
        nft_type: nftType,
        mint_amount: this.mintAmount,
        currency_symbol: currencySymbol,
        currency_contract: currencyContract,
        currency_amount: refundCurrencyAmount,
        tx_id: txid,
        reg_id: walletAddress,
      }
      const result = await this.$axios.post('/api/refundlog/insertRefundLog', paramRefundLog)
      // console.log(result.data)
      if (!result || !result.data || result.data.returnCd != 0) {
        this.$noti(this.$q, this.$t('process_failed') + ': insertRefundLog')
        return
      }

      console.log('■■■■■■■ refund ■■■■■■■ END')
    },
    async transferBNBCoin(
      tokenAddress,
      amount,
      adminWalletAddress,
    ) {
      let returnVo = {
        ...this.$ERROR_CODE_UNEXPECTED
      }
      try {
        console.log("■■■■■■■ transferCoin ■■■■■■■ START")
        // MetaMask 연결 설정
        if (typeof window.ethereum !== 'undefined') {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const web3 = new Web3(window.ethereum)

          const networkId = await web3.eth.net.getId()
          if (networkId != this.$BSC_MAINNET_ID) {
            returnVo = {
              ...this.$ERROR_CODE_REQUIRE_MAINNET_NETWORK
            }
            return returnVo            
          }

          returnVo = {
            ...this.$ERROR_CODE_GET_ASSOCIATED_TOKEN_ADDRESS
          }
          const accounts = await web3.eth.getAccounts()
          const senderAddress = accounts[0]
          console.log('tokenAddress: ' + tokenAddress)
          
          const tokenContract = new web3.eth.Contract(ERC20.abi, tokenAddress)
          const decimals = await tokenContract.methods.decimals().call()
          const adjustedAmount = new BN(amount).mul(new BN(10).pow(new BN(decimals)))
          returnVo = {
            ...this.$ERROR_CODE_ACCOUNT_BALANCE
          }
          // 잔액 조회
          const balance = await tokenContract.methods.balanceOf(senderAddress).call()
          const balanceBN = new BN(balance)
          console.log(`Token Balance: ${balanceBN.toString()}`)

          if (adjustedAmount.gt(balanceBN)) {
            console.error('Insufficient balance.')
            return returnVo
          }
          returnVo = {
            ...this.$ERROR_CODE_COIN_TRANSFER
          }
          // 트랜잭션 생성 및 전송
          const tx = tokenContract.methods.transfer(adminWalletAddress, adjustedAmount.toString())
          const gas = await tx.estimateGas({ from: senderAddress })
          const gasPrice = await web3.eth.getGasPrice()
          const data = tx.encodeABI()
          const txData = {
            from: senderAddress,
            to: tokenAddress,
            data: data,
            gas,
            gasPrice,
          }
          const receipt = await web3.eth.sendTransaction(txData)
          console.log('ERC-20 Transfer Receipt:', receipt.transactionHash)
          
          returnVo = {
            returnCd: 0,
            tx_id: receipt.transactionHash
          }
          console.log('======== Success Transfer Coin =======');
          return returnVo
        } else {
          console.error('MetaMask is not installed.');
          return returnVo;
        }
      } catch (error) {
        console.error('Error during transaction:', error)
        return returnVo;
      }
    },
    walletAccountsChangedMetamask(accounts) {
      // console.log(accounts)
      this.$store.dispatch('setWalletType', 'metamask')
      this.$store.dispatch('setWalletAddress', accounts[0])
      this.$cookie.set('walletAddress', accounts[0])
      this.$cookie.set('walletType', 'metamask')
      localStorage.setItem('WALLETADDRESS', accounts[0])
      localStorage.setItem('WALLETTYPE', 'metamask')

      // ■■■ 회원정보 체크, 존재하지 않으면 insert
      try {
        this.checkAndRegisterUser(accounts[0])
      } catch(e) {
        console.log(e)
      }
    },
    handleChainChangedMetamask(chainId) {
      console.log(chainId) // eth mainnet: 0x1, cypress: 0x2019, baobab: 0x3e9
      // We recommend reloading the page, unless you must do otherwise
      // window.location.reload();
      this.checkChain()
    },
    async checkChain() {
      // 로그인 상태가 아니면 처리하지 않음
      if(!this.$store.getters.getWalletAddress) {
        return
      }

      // 메인넷 확인
      const walletType = this.$store.getters.getWalletType
      let chainId = ''
      if (walletType === 'kaikas') {
        chainId = window.klaytn.networkVersion
      } else if (walletType === 'metamask') {
        chainId = await window.ethereum.request({ method: 'eth_chainId' })
      } else {
        return true
      }
      if (chainId !== 8217 && chainId !== '0x2019') {
        // 메인넷이 아니므로 로그아웃
        this.logout()
        this.$noti(this.$q, this.$t('set_to_the_mainnet'))
        return false
      }
      return true
    },
    // async connectMetaMaskWallet() {
    //   // this.$noti(this.$q, this.$t('wallet_metamask'))
    //   if (typeof window.ethereum !== 'undefined') {
    //     try {
    //       // MetaMask 네트워크를 BSC로 전환 또는 추가
    //       if (this.$BSC_MAINNET_ID == 56) { // 메인넷으로 배포하는 경우 이 조건 성립
    //         await window.ethereum.request({
    //           method: 'wallet_addEthereumChain',
    //           params: [{
    //               chainId: '0x38', // 56 in decimal
    //               chainName: 'Binance Smart Chain',
    //               nativeCurrency: {
    //                   name: 'Binance Coin',
    //                   symbol: 'BNB',
    //                   decimals: 18
    //               },
    //               rpcUrls: ['https://bsc-dataseed.binance.org/'],
    //               blockExplorerUrls: ['https://bscscan.com/']
    //           }]
    //         })
    //       }

    //       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    //       const walletAddress = accounts[0]
    //       // alert(walletAddress)

    //       // this.$store.dispatch('setWalletType', 'metamask')
    //       // this.$store.dispatch('setWalletAddress', walletAddress)

    //       this.$cookie.set('walletAddress', walletAddress)
    //       this.$cookie.set('walletType', 'metamask')
    //       this.$store.dispatch('setWalletAddress', walletAddress)
    //       this.$store.dispatch('setWalletType', 'metamask')
    //       localStorage.setItem('WALLETADDRESS', walletAddress)
    //       localStorage.setItem('WALLETTYPE', 'metamask')

    //       // ■■■ 회원정보 체크, 존재하지 않으면 insert
    //       try {
    //         this.checkAndRegisterUser(walletAddress)
    //       } catch(e) {
    //         console.log(e)
    //       }
    //     } catch (error) {
    //       console.log(error)
    //       this.$noti(this.$q, error.message)
    //     }
    //   } else {
    //     this.$noti(this.$q, this.$t('MetaMask is not installed.'))
    //     window.open('https://metamask.app.link/dapp/https://mint.bumiband.com')
    //     // window.open('https://metamask.app.link/dapp/https://')
    //   }
    // },
    async connectMetaMaskWallet() {
      // this.$noti(this.$q, this.$t('wallet_metamask'))
      console.log("connectMetaMaskWallet")
      if (typeof window.ethereum !== 'undefined') {
        try {
          // MetaMask 네트워크를 Ethereum 메인넷으로 전환 또는 추가
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x1', // Ethereum 메인넷 (1 in decimal)
              chainName: 'Ethereum Mainnet',
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://eth.llamarpc.com'],
              blockExplorerUrls: ['https://etherscan.io/']
            }]
          })

          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          const walletAddress = accounts[0]
          // alert(walletAddress)

          // this.$store.dispatch('setWalletType', 'metamask')
          // this.$store.dispatch('setWalletAddress', walletAddress)

          this.$cookie.set('walletAddress', walletAddress)
          this.$cookie.set('walletType', 'metamask')
          this.$store.dispatch('setWalletAddress', walletAddress)
          this.$store.dispatch('setWalletType', 'metamask')
          localStorage.setItem('WALLETADDRESS', walletAddress)
          localStorage.setItem('WALLETTYPE', 'metamask')

          // ■■■ 회원정보 체크, 존재하지 않으면 insert
          try {
            this.checkAndRegisterUser(walletAddress)
          } catch (e) {
            console.log(e)
          }
        } catch (error) {
          console.log(error)
          this.$noti(this.$q, error.message)
        }
      } else {
        this.$noti(this.$q, this.$t('MetaMask is not installed.'))
        window.open('https://metamask.app.link/dapp/https://mint.bumiband.com')
        // window.open('https://metamask.app.link/dapp/https://')
      }
    },
    async checkEthereumNetwork() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId === '0x1') {
            console.log('Ethereum Mainnet에 연결되었습니다.');
            return true; // 연결 확인
          } else {
            console.log('다른 네트워크에 연결되었습니다. 현재 체인 ID:', chainId);
            return false; // 다른 네트워크에 연결된 경우
          }
        } catch (error) {
          console.error('네트워크 확인 중 오류가 발생했습니다.', error);
          return false; // 오류 처리
        }
      } else {
        console.error('MetaMask가 설치되어 있지 않습니다.');
        return false; // MetaMask 미설치
      }
    },
    checkAndRegisterUser(walletAddress) {
      /////////////////////////////////////////////////////////////////
      // user 존재유무 체크 존재하지 않는 경우 신규 등록
      /////////////////////////////////////////////////////////////////
      const param = {
        uid: walletAddress,
        wallet_address: walletAddress,
        wallet_type: this.getWalletType,
        reg_id: walletAddress,
      }
      this.$axios.post('/api/user/checkAndInsertUser', param)
    },
    disconnectMetamaskWallet() {
      // console.log('들어옴!!!!!!!!!')
      // this.phantomDisconnecting()

      this.$store.dispatch('setWalletAddress', '')
      this.$store.dispatch('setWalletType', '')
      localStorage.setItem('WALLETADDRESS', '')
      localStorage.setItem('WALLETTYPE', '')
      this.$cookie.set('walletAddress', '')
      this.$cookie.set('walletType', '')
    },
    copyValue(value) {
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      // 클립보드로 복사하기
      this.$copyText(String(value)).then(this.copyValueSuccess, this.copyValueFail)
      },
    copyValueSuccess(e) {
      // console.log(e)
      this.$noti(this.$q, 'copied to clipboard')
    },
    copyValueFail(e) {
      // console.log(e)
      this.$noti(this.$q, 'copy failed')
    },
    goPage(index) {
      if (index === 0) {
        this.$router.push('/')
      } else {
        this.$router.push('/beastar' + index)
      }
    },

  },
})
</script>

<style scoped>
:deep(.material-icons) {
  font-family: 'Material Icons' !important;
}
</style>