import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    //   height : 500,
    //   width: 650,
       objectFit: 'contain',
    maxWidth: '100%',
    height: 'auto',
    background : 'rgba(0,0,0,0.5)',
    transition: "transform 0.3s ease-in-out",
  },
  cardHovered: {
    transform: "scale3d(1.01, 1.01, 1)"
  },
  media : {
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  title :{
    fontFamily: 'Domine, serif',
    fontWeight: 'bold',
    fontSize: '2rem',
    color : '#fff'
  },
  desc : {
    fontFamily: 'Domine, serif',
    fontSize: '1.1rem',
    color : '#ddd'
  }
});

export default function ImageCard(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    raised:false,
    shadow:1,
  })
  return (
    <Card className={classes.root} 
        classes={{root: state.raised ? classes.cardHovered : ""}}
        onMouseOver={()=>setState({ raised: true, shadow:2})} 
        onMouseOut={()=>setState({ raised:false, shadow:1 })} 
        raised={state.raised} zdepth={state.shadow}
        >
        <CardMedia
          className={classes.media}
          component="img"
          alt="ज्ञान सूत्र"
          image={`${process.env.PUBLIC_URL + '/assets/' + props.imgSrc}`}
          title="ज्ञान सूत्र"
        />
        <CardContent>
          <Typography gutterBottom className={classes.title}>
            ज्ञान सूत्र
          </Typography>
          <Typography className={classes.desc}>
            जो परिवार त्याग, उदारता, सहयोग, स्नेह और मतैक्य की मजबूत डोर से बंधे रहते हैं एवं जिनमें यम-नियम, संयम-सदाचार, अनुशासन-शिष्टाचार, सेवा-निष्कामता आदि का पालन किया जाता है, उस परिवार के सभी सदस्य लौकिक सुखों के साथ आत्मोद्धार की पात्रता भी प्राप्त कर सकते हैं।
     देवयज्ञ, ऋषियज्ञ, पितृयज्ञ, मनुष्ययज्ञ एवं भूतयज्ञ के द्वारा परमात्मा रूप समाज सृष्टि की सेवा का अधिकार गृहस्थों को ही मिला है।
      देवऋण, ऋषिऋण एवं पितृऋण को चुकाने का अवसर भी गृहस्थों को भरपूर मिलता है। ऋषि, पूर्वज, वृद्ध, साधु-संन्यासी,अभावग्रस्त, जीव- जंतुओं एवं अतिथि आदि सभी गृहस्थों से कुछ पाने की इच्छा रखते हैं, जिसे धर्म परायण गृहस्थ हर प्रकार से संतुष्ट करते हैं।
      वेदों में गृहस्थ आश्रम को जेष्ठ आश्रम माना गया है। जो इस आश्रम से लाभ उठाकर आत्म कल्याण के मार्ग में अग्रसर होने की कला को जानते हैं, वे धन्यभागी हैं। 
       गृहस्थ आश्रम ही ब्रह्मचर्य आश्रम, वानप्रस्थ आश्रम एवं संन्यास आश्रम का पालक है।
        गृहस्थ आश्रम में यानी प्रवृत्ति मार्गी ही श्रेष्ठ संतान काे जन्म देकर समाज को श्रेष्ठ ब्रह्मचारी, श्रेष्ठ सन्यासी एवं श्रेष्ठ मनुष्यों का उपहार दे सकती है।
         कामवासना समस्त प्राणियों का एक प्रबल प्रवृत्ति है। यदि प्रवृत्तिमार्ग यानी गृहस्थमार्ग का विधान ना होता तो यह अपना भयानक एवं वीभत्स रूप धारण कर मानव समाज के स्वर्गीय रूप का हनन कर उसे नारकीय एवं भयानक बना देता। गृहस्थ जीवन में प्रवेश कर व्यक्ति अपने उद्याम कामवासना को एक स्त्री व एक पुरुष तक संयमित करता है। फिर शनैः-शनैः पति-पत्नी एक दूसरे का सहयोग लेकर निर्वासनिकता की ओर अग्रसर होते हैं। इसीलिए कहा गया- धन्यः गृहस्थ आश्रमः।
          </Typography>
        </CardContent>
    </Card>
  );
}
