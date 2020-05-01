createFile(data) {
        console.log("进入了下载的方法")
        console.log(data.length)
        if (!data) {
          return;
        }
        //对传过来的二进制流进行解码
        var bytes = window.atob(data)
        var n = bytes.length
        var u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bytes.charCodeAt(n);
        }
        //u8arr为解码后的文件
        let blob = new Blob([u8arr], {
          type: 'application/pdf'//转码后的格式
        });
        
        let url = window.URL.createObjectURL(blob);
        let fileName = "xiao.pdf"; //this.data.plan_no +
        //利用a标签的属性实现下载的功能
        if ("download" in document.createElement("a")) {
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
        } else {
          //如果下载错误则生成blob格式的文件 navigator为 window的方法
          navigator.msSaveBlob(blob, fileName);
        }
      },
      