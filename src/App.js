import React, { Component } from 'react';
import FineUploaderS3 from 'fine-uploader-wrappers/s3';
import Gallery from 'react-fine-uploader';

import logo from './logo.svg';
import './App.css';
import 'react-fine-uploader/gallery/gallery.css';
var folderNameIframe = ''
var filenameIframe = ''
var itemMultipleIframe = ''
function iniFrame() { 
  if ( window.location !== window.parent.location ) 
  { 
    window.addEventListener('message', function(e) {
      var message = e.data;
      console.log(message)
      var test = message.split('.')
      folderNameIframe = test[0] 
      filenameIframe = test[1]
      itemMultipleIframe = test[2]
    });  
  }  
  else { 
    folderNameIframe = "a/b/c/"
    filenameIframe = 'AHSGSH'
  } 
}
iniFrame()
// alert(folderNameIframe)
console.log(folderNameIframe, 'gsfagsfagsf') 
setTimeout(()=>{
   folderName = folderNameIframe;
   fileName = filenameIframe;
   SessionId = "this.state.Session"
   itemMultiple= itemMultipleIframe 
}, 2000)
var  folderName
var  fileName
var SessionId 
var  itemMultiple
var newItemLimit = 1
const uploader = new FineUploaderS3({
  options: {
    request: {
      endpoint: "https://canfineuploads.s3-ca-central-1.amazonaws.com",
      accessKey: "AKIAXVWCICU3VAAPCGL3"
    },
    signature: {
      endpoint: "https://gnfmtl8n6j.execute-api.ca-central-1.amazonaws.com/prod",
      version: 4,
    },
    chunking: {
      enabled: true,
    },
    objectProperties: {
      region: "ca-central-1",
      key: function(fileId) { 
        console.log(this.getName(fileId), 'hagshags')
        const NewFile = this.getName(fileId)
        const split = NewFile.split(".");
        
        // console.log(this.getFilenameParam(fileId) , 'fileID') 
        // console.log(fileId), 'sandeep') 
          console.log(this.getUuid(fileId), 'sandeep');
        //  var Session =this.getUuid(fileId)
         this.setUuid (fileId, SessionId)
         console.log(this.getUuid(fileId), 'setUuid');
        //  var uploads = uploader.getUploads();
        //  console.log(uploads)
        var testCase= this.getUploads(fileId)
        console.log(testCase, 'dags')
        //  console.log(this.getUuid(fileId), 'fssfsadasd')
        //  var test=  this.getInProgress ()
        //  console.log(test) 
          //----------for fileName to be  Same as in  user or Admin System---------------- 
          // return folderName + '/' + NewFile;
          // ---For File name from  a variable----------- 
          // return folderName + '/' + fileName;
          return folderName + '/' + fileName+'.'+split[1];
         

      }  
    },
   
    callbacks: {
      // endpoint:this.successPage()
      onComplete:function(id, name, response) {
        // document.getElementsByClassName("hideOnUpload").style.display= "none"
        document.getElementById("myProgress").style.display ='none'
      }
      
    },
    
  }
})

class App extends Component {
  constructor(props) {
    super(props); 
     this.state = {
       mutiple:false,
       folderName : '' ,
       filename: '',
       x: '', y: '' ,
       Session: 'hsgashgasahgsahsgs',    
     }
  }
  componentDidMount(){
    // this.iniFrame() 
   }
   shouldComponentUpdate(nextProps, nextState) {
     console.log(nextState.filename !== this.state.filename, '1')
     console.log(nextState.folderName !== this.state.folderName , '2')
     return nextState.filename !== this.state.filename && nextState.folderName !== this.state.folderName
   }
  
  render() {
   
    const divStyle = {
      display :'hidden'
    }
    const divStyle1 = {
      display :'none'
    }
    const myProgress = {
    display: 'none', 
    width: '100%',
    backgroundColor: '#ddd'
   }
   const myBar = {
	width: '0%',
	height: '30px',
	backgroundColor: '#4CAF50',
	textAlign: 'center',
	lineHeight: '30px',
	color: 'white'
   }
    return (
      <div className="App">
        <h1 className="centered">Secure 'Serverless' File Uploads with AWS Lambda, S3, and Zappa</h1>
        <div id="myProgress"> 
        <Gallery className="gallery"  uploader={uploader}/>
        </div>
      </div>
    );
  }
}

export default App;
