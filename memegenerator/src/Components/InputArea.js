import React from "react"





class InputArea extends React.Component{

  constructor(){
    super()
    this.state={
      memeImages:[],
      randomImage:"https://i.imgflip.com/30b1gx.jpg",
      counter:1,
      inputBoxID:0,
      inputBoxes:[],
      fontSize:12,
      color:""
    }
    this.changeImage = this.changeImage.bind(this)
    this.addTextBox = this.addTextBox.bind(this)
    this.dragOverImage = this.dragOverImage.bind(this)
    this.dropImage = this.dropImage.bind(this)
    this.fontSizeChange = this.fontSizeChange.bind(this)
    this.fontColorChange = this.fontColorChange.bind(this)
    this.onFileLoad = this.onFileLoad.bind(this)

  }

   changeImage(){
     console.log("Clicked");
    this.setState(currentState=>{
      return{
      counter:currentState.counter + 1,
      randomImage:currentState.memeImages[currentState.counter].url
    }
    }
  )
  }



  componentWillMount(){
    fetch("http://127.0.0.1:5000/getimages")
    .then(response => response.json())
    .then(response=>{
      const {data} = response
      this.setState({
        memeImages:data.memes
      })
    })
    console.log();
  }

  addTextBox(){
    return(
      <input className="inputBox" type="text" placeholder="Top Text" />
    )
  }

  dropImage(event){
    const id= event.dataTransfer.getData("id")
    console.log(id);
    const boxStyle = {
    position:"absolute",
    left: event.clientX,
    top: event.clientY,
  };
    if(id==-1){
      console.log(id);
      event.preventDefault()
      const box={
        boxID:this.state.inputBoxID,
        style:boxStyle
      }
      this.setState(function(state){
       return {
         inputBoxes: state.inputBoxes.concat(box),
         inputBoxID: state.inputBoxID + 1
       };
    })

  }
  else{
    const index = this.state.inputBoxes.findIndex(element=>element.boxID==id)
    let newBoxArray = [...this.state.inputBoxes]
    newBoxArray[index].style = boxStyle
    this.setState(function(state){
     return {
       inputBoxes: newBoxArray
     };
  })
  }
}

  dragOverImage(event){
    event.preventDefault()
  }


  dragStart(event,id){
    event.dataTransfer.setData("id",id)
  }

  fontSizeChange(event){
    const fSize = event.target.value
    this.setState({fontSize:parseInt(fSize,10)})
  }

  fontColorChange(event){
    console.log(event.target.value);
    this.setState({color:event.target.value})
  }

  onFileLoad(event){
    const file = event.currentTarget.files[0]
    console.log(file);
    let fileReader = new FileReader()
    fileReader.onload = ()=>{
    this.setState(function (){
      return{
        randomImage : "data:"+file.type+fileReader.result
      };
    })
    }
    fileReader.readAsDataURL(file)
  }






  render(){

    console.log(this.state.inputBoxes);
    const inputboxes=this.state.inputBoxes.map((item)=>{

      const styleClass={
        position:item.style.position,
        left: item.style.left,
        top: item.style.top,
        fontSize: this.state.fontSize,
        color:this.state.color
      }
      return <textarea id={item.BoxID} key={item.BoxID} className="memeInputBox" style={styleClass} type="text" placeholder="Enter Meme Text" draggable onDragStart={(e)=>{this.dragStart(e,item.boxID)}} />
    });

      return(
        <div>
        <div className="inputBoxContainer">
        <input className="inputBox" type="text" placeholder="Drag me" draggable onDragStart={(e)=>{this.dragStart(e,-1)}} readOnly />
      <input className="fontSizeInputBox" list="fontSize" name="fontSize" type="number" onChange={this.fontSizeChange}/>
      <datalist id="fontSize">
      <option value="12" />
      <option value="14" />
      <option value="18" />
      <option value="24" />
      <option value="28" />
      <option value="32" />
  </datalist>
        <select name="color" onChange={this.fontColorChange}>
        <option value="black">Black</option>
        <option value="white">White</option>
        </select>

        </div>
        <img className="memeImage" src={this.state.randomImage} onDragOver={this.dragOverImage} onDrop={this.dropImage}/>
        <button onClick={this.changeImage}> Next Image</button>
        {inputboxes}
        <label className="uploadLabel" htmlFor  ="upload-button" >Upload Custom Image </label>
        <input type="file" id="upload-button" style={{ display: "none" }} onChange={this.onFileLoad}/>
        </div>
      )
  }
}

export default InputArea
