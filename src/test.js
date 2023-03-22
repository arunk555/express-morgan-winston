class UrlBuilder {
    // Use console.log for debugging
    constructor(){
        this.protocal='http://';
        this.hostname='';
        this.portnumber='';
        this.pathname='';
        this.qrystring='';
    }
    https(){
       this.protocal='https://';
       return this;
    }
    host(str){
       this.hostname=str;
       return this;
    }
    port(strport){
        this.portnumber=strport;
        return this;
    }
    path(pathstr){
      this.pathname=pathstr;
      return this;
    }
    queryParams(obj){
        if(obj){
          const arrqry=[]; 
          for(const [key, value] of Object.entries(obj)){
             arrqry.push(key+'='+value);
          }
          if(arrqry.length>0){
            this.qrystring= '?'+arrqry.join('&');
          }
        }
        return this;
    }
    build(){
        return `${this.protocal}${this.hostname}${this.portnumber}${this.pathname}${this.qrystring}`;
    }
}

console.log(new UrlBuilder().host('test.com').https().queryParams({key:'test', key1:'ggff'}).build())


module.exports = UrlBuilder;
