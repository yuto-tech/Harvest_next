// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import styled from "styled-components";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

//swiper使用
export default () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      centeredSlides={false}
      loop={true}
      navigation
      scrollbar={{ draggable: true }}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      style={{ padding: 20, paddingTop: 30 }}
    >
      <SwiperSlide>
        <Swiper__slide>
          <Image src={`/static/pics2.jpg`} width={360} height={280} />
          <Swiper__box>
            <Swiper__title>猫でもパンケーキが食べたい！！</Swiper__title>
            <Swiper__top>
              <Swiper__icon src="./static/pics2.jpg" />
              <Swiper__bottom>
                <Swiper__user>neko</Swiper__user>
                <Swiper__view>支援 10万回/残り 7日</Swiper__view>
              </Swiper__bottom>
            </Swiper__top>
            <Swiper__ex>
              猫だってパンケーキ食べたいに決まっている。私はパンケーキが大好き。
              そして愛猫のポムのことも大好き。
              <br />
              ポムが美味しく食べれるパンケーキを作りたい！
            </Swiper__ex>
          </Swiper__box>
        </Swiper__slide>
      </SwiperSlide>
      <SwiperSlide>
        <Swiper__slide>
          <Image src={`/static/pics2.jpg`} width={360} height={280} />
          <Swiper__box>
            <Swiper__title>猫でもパンケーキが食べたい！！</Swiper__title>
            <Swiper__top>
              <Swiper__icon src="./static/pics2.jpg" />
              <Swiper__bottom>
                <Swiper__user>neko</Swiper__user>
                <Swiper__view>支援 10万回/残り 7日</Swiper__view>
              </Swiper__bottom>
            </Swiper__top>
            <Swiper__ex>
              猫だってパンケーキ食べたいに決まっている。私はパンケーキが大好き。
              そして愛猫のポムのことも大好き。
              <br />
              ポムが美味しく食べれるパンケーキを作りたい！
            </Swiper__ex>
          </Swiper__box>
        </Swiper__slide>
      </SwiperSlide>
      <SwiperSlide>
        <Swiper__slide>
          <Image src={`/static/pics2.jpg`} width={360} height={280} />
          <Swiper__box>
            <Swiper__title>猫でもパンケーキが食べたい！！</Swiper__title>
            <Swiper__top>
              <Swiper__icon src="./static/pics2.jpg" />
              <Swiper__bottom>
                <Swiper__user>neko</Swiper__user>
                <Swiper__view>支援 10万回/残り 7日</Swiper__view>
              </Swiper__bottom>
            </Swiper__top>
            <Swiper__ex>
              猫だってパンケーキ食べたいに決まっている。私はパンケーキが大好き。
              そして愛猫のポムのことも大好き。
              <br />
              ポムが美味しく食べれるパンケーキを作りたい！
            </Swiper__ex>
          </Swiper__box>
        </Swiper__slide>
      </SwiperSlide>
      <SwiperSlide>
        <Swiper__slide>
          <Image src={`/static/pics2.jpg`} width={360} height={280} />
          <Swiper__box>
            <Swiper__title>猫でもパンケーキが食べたい！！</Swiper__title>
            <Swiper__top>
              <Swiper__icon src="./static/pics2.jpg" />
              <Swiper__bottom>
                <Swiper__user>neko</Swiper__user>
                <Swiper__view>支援 10万回/残り 7日</Swiper__view>
              </Swiper__bottom>
            </Swiper__top>
            <Swiper__ex>
              猫だってパンケーキ食べたいに決まっている。私はパンケーキが大好き。
              そして愛猫のポムのことも大好き。
              <br />
              ポムが美味しく食べれるパンケーキを作りたい！
            </Swiper__ex>
          </Swiper__box>
        </Swiper__slide>
      </SwiperSlide>
    </Swiper>
  );
};

//styled-componentsの書き方
//変数の初めは大文字

const Swiper__slide = styled.a`
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  color: black;
`;
const Swiper__box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  padding-left: 20px;
`;
const Swiper__title = styled.h3`
  margin-top: 6px;
  font-size: 16px;
`;
const Swiper__top = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`;
const Swiper__icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const Swiper__view = styled.div`
  width: 200px;
`;
const Swiper__user = styled.div`
  width: 100px;
`;
const Swiper__bottom = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding-left: 10px;
`;
const Swiper__ex = styled.div`
  padding-top: 20px;
  font-size: 18px;
  width: 90%;
`;
