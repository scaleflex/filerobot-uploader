function getModalWidth(props) {
  const { exact, xl, lg, md, sm, xs, fluid } = props;
  const size = exact ? 'exact' : xl ? 'xl' : lg ? 'lg' : md ? 'md' : sm ? 'sm' : xs ? 'xs' : 'md';

  if (size === 'exact') return exact;

  return props.theme.modal[fluid ? 'fluid' : 'fixed'][size];
}

function getFieldColorStyles(props) {
  if (props.dark) return ``;
  else return `
    color: ${getColor(props, 'text')};
    background-color: ${getColor(props, 'background')};
    border: 1px solid ${getColor(props, 'border')};
    
    &::-webkit-input-placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    &::-moz-placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    &:-ms-input-placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    &::-ms-input-placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    &::placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    
    &:focus {
      color: ${getColor(props, 'text')};
      background-color: ${getColor(props, 'background')};
      border-color: ${getColor(props, 'link')};
      outline: 0;
    }
    &:focus::-ms-value {
      color: ${getColor(props, 'text')};
      background-color: ${getColor(props, 'background')};
      border-color: ${getColor(props, 'link')};
      outline: 0;
    }
  `;
}

function getIconStyles(props) {
  return `
    font-family: 'scaleflex-icon-font' !important;
    color: ${props.muted ? props.theme.colors.text.mute : props.theme.colors.text.base};
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
  
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    :hover {
      color: ${props.muted ? props.theme.colors.text.mute : props.theme.colors.text.base};
    }
  `;
}

function shadeBlendConvert(p, from, to) {
  if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
  if(!window.sbcRip)window.sbcRip=(d)=>{
    let l=d.length,RGB=new Object();
    if(l>9){
      d=d.split(",");
      if(d.length<3||d.length>4)return null;//ErrorCheck
      RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
    }else{
      if(l==8||l==6||l<4)return null; //ErrorCheck
      if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
      d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
    }
    return RGB;}
  var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=window.sbcRip(from),t=window.sbcRip(to);
  if(!f||!t)return null; //ErrorCheck
  if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
  else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}

function isHex(color) {
  return (/^#?([a-f\d])([a-f\d])([a-f\d])$/i).test(color) || (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).test(color);
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export const getHoverColor = (color) => {
  if (!color) return null;

  const nextColor = shadeBlendConvert(-0.1, color) || '';

  return nextColor.toLowerCase() === color.toLowerCase() ? shadeBlendConvert(0.25, color) : nextColor;
}

export const getWithOpacity = (color, opacity) => {
  if (!color) return null;

  const isHexColor = isHex(color);
  const hexColor = isHexColor ? color : shadeBlendConvert(0, color, 'c');
  if (!hexColor) return null;
  const rgbColor = hexToRgb(hexColor);

  if (!rgbColor) return color;

  return `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`;
}

export const getElementStylesBySize = (props, type, field) => {
  const { sm, lg } = props;
  const size = sm ? 'sm' : lg ? 'lg' : 'md';

  return props.theme[type] && props.theme[type][size] && props.theme[type][size][field];
}

export const getColor = (props, type, field = 'base', isThemeOverlay, isSupreme) => {
  const themeOverlay = isThemeOverlay ? props.theme.colors.base : null;

  return props.theme.colors[type][themeOverlay ? (themeOverlay + (isSupreme ? 'er' : '')) : field];
}


export { getModalWidth, getIconStyles, getFieldColorStyles };