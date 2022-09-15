import React from "react";
import "./Footer.scss";
const footer = () => {
  return (
    <div className="panelFooter">
      <h3>
        Phim chất lượng cao online của{" "}
        <a href="." style={{ color: "#428bca" }} className="linkTittle">
          XemPhim
        </a>{" "}
        khác gì so với các trang phim khác?
      </h3>
      <div className="containerFooter">
        <ul>
          <li>
            Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD
            (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân
            giải HD (720p) là cao nhất
          </li>
          <li>
            Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần
            phim online thông thường - đây là yếu tố quyết định độ nét của phim
            (thậm chí còn quan trọng hơn độ phân giải)
          </li>
          <li>
            Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang
            phim khác (kể cả Youtube)
          </li>
          <li>
            Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải
            cao
          </li>
          <li>
            Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề
            của riêng mình để xem online
          </li>
          <li>
            Có lựa chọn hiện phụ đề song ngữ (tức hiện đồng thời cả tiếng Anh &
            tiếng Việt), phù hợp với những người muốn học tiếng Anh qua phụ đề
            phim
          </li>
        </ul>
      </div>
      {/* <p className="copyright">© 2022 XemPhim</p> */}
    </div>
  );
};

export default footer;
