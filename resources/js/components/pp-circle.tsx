export default function PpCircle({ pp, circle, size = "xs" }) {
    let bgsize = 16; 
    let textsize = 8;
  
    if (size === "xs") {
      bgsize = 16;
      textsize = 8;
    } else if (size === "sm") {
      bgsize = 24;
      textsize = 12;
    } else if (size === "md") {
      bgsize = 32;
      textsize = 16;
    } else if (size === "lg") {
        bgsize = 64;
        textsize = 32;
      }
  
    return (
      <div className="flex">
        <div
          className="rounded-full overflow-hidden flex justify-center items-center bg-amber-200 shadow"
          style={{ width: bgsize, height: bgsize }}
        >
          {!pp ? (
            <i
              className="fas fa-user text-white"
              style={{ fontSize: textsize }}
            ></i>
          ) : (
            <img src={pp} alt="" className="w-full h-full object-cover" />
          )}
        </div>
      </div>
    );
  }
  