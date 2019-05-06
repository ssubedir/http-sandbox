export class Json2xml{

    constructor() {
    }
    toXml(v, name, ind){
        var xml = "";
            if (v instanceof Array) {
               for (var i=0, n=v.length; i<n; i++)
                  xml += ind + this.toXml(v[i], name, ind+"\t") + "\n";
            }
            else if (typeof(v) == "object") {
               var hasChild = false;
               xml += ind + "<" + name;
               for (var m in v) {
                  if (m.charAt(0) == "@")
                     xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                  else
                     hasChild = true;
               }
               xml += hasChild ? ">" : "/>";
               if (hasChild) {
                  for (var m in v) {
                     if (m == "#text")
                        xml += v[m];
                     else if (m == "#cdata")
                        xml += "<![CDATA[" + v[m] + "]]>";
                     else if (m.charAt(0) != "@")
                        xml += this.toXml(v[m], m, ind+"\t");
                  }
                  xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
               }
            }
            else {
               xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
            }
            return xml;
        }
    
}
  