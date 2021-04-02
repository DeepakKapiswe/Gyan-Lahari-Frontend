import React from 'react';
import {useForm} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useNavigate } from "@reach/router"

import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useEffect } from 'react';
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const distributorIdList = ['All Distributors'];
for (var i = 1; i <= 200; i++) {
    distributorIdList.push(i);
}

const allDistIds = []
for (var j = 1; j < 200; j++) {
    allDistIds.push(j.toString());
}


const useStyles = makeStyles(theme => (
  {
    root: {
    },
    paper: {
      margin: theme.spacing(0, 0, 2, 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    names: {
      margin: theme.spacing(0, 0, 0, 1),
    },
    bgColor: {
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(5),
      },
       backgroundColor: '#ebf5ab'
      // backgroundColor: '#f0f5ce'
      // background: 'linear-gradient(to right, #190A05, #870000)'
      //background: 'linear-gradient(to bottom,  rgba(255,197,120,1) 6%,rgba(255,197,120,1) 17%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 49%,rgba(255,197,120,1) 60%,rgba(255,197,120,1) 60%,rgba(251,157,35,1) 97%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 100%,rgba(251,157,35,1) 101%)',

    },
    heading: {
      // color: '#ffffff',
      color: '#110F4C',
      [theme.breakpoints.up('sm')]: {
        fontSize: '3rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    },
    form: {
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
export default function BulkExpiryListForm(props) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
 
  useEffect(() => {
    register({ name: "beldDistIds" });
    register({ name: "beldExpiryVol" });
    register({ name: "beldExpiryYearDuration" });
  });
  
  const saveLastLocation = useSaveLastLocation();
  const saveNextLocation = useSaveNextLocation();
  saveLastLocation();
  
  const onSubmit = data => {
    data.beldExpiryVol          = data.beldExpiryVol*1
    data.beldExpiryYearDuration = data.beldExpiryYearDuration*1
    data.beldDistIds =
        data.beldDistIds.includes('All Distributors') 
      ? allDistIds    // this could be modified in multiple requests if all distributors are selected
                      // as otherwise this call takes too much time due to excess data in same pdf
      : data.beldDistIds.map(dId => dId.toString())
    saveNextLocation("/patrika/bulkExpiryList", {state:{beldDetails:data}})
    navigate("/patrika/bulkExpiryList", {state:{beldDetails:data}})
  };

  const classes = useStyles();

  function RenderHeading(props) {
    return (
      <Grid item alignItems="center" >
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
             Expiry Chart Details
        </Typography>
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
             ऐक्सपायरी पर्ची विवरण
        </Typography>
        <FlowerDiv/>
      </Grid>)
  }

  function RenderForm() {
    return (
      <Container maxWidth='sm'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}
            className={classes.form}
            component={Paper} elevation={6}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
            <Autocomplete
              id="beldDistIds"
              name="beldlDistIds"
              fullWidth 
              multiple
              options={distributorIdList}
              disableCloseOnSelect
              onChange={(e, data) => {
                setValue("beldDistIds", data);
              }}
              getOptionLabel={(option) => distNames[option.toString()] || distNames['All Distributors']}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                 {distNames[option.toString()] || distNames['All Distributors']}
                </>
              )}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  variant="outlined" 
                  label="Choose Distributor ID"
                  placeholder="Choose Distributor ID" 
                />
              )}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                onChange={(e) => {
                    setValue("beldExpiryVol",e.target.value);
                  }}
                type="number"
                id="beldExpiryVol"
                name="beldExpiryVol"
                label="Expiries Before Issue Number : "
                autoComplete="beldExpiryVol"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                required
                onChange={(e) => {
                    setValue("beldExpiryYearDuration",e.target.value);
                  }}
                fullWidth
                hidden
                type="number"
                id="beldExpiryYearDuration"
                name="beldExpiryYearDuration"
                label="Expiry List For Years : "
                autoComplete="beldExpiryYearDuration"
              />
            </Grid>
            <Grid container justify="center">
              <Grid item >
                <Button
                  type="submit"
                  name="getBulkExpiryList"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Prepare Expiry List
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
  return (
    <Grid
      container xs
      className={classes.bgColor}
      direction="row-reverse"
      justify="center"
      alignItems="center"
    >
      <Grid className={classes.paper} >
        <CssBaseline>
         <>
           <RenderHeading />
           <RenderForm />
         </>
        </CssBaseline>
      </Grid>
    </Grid>
  );
}


const distNames = {
   'All Distributors' : 'सभी वितरक', 
   '1' :   '1 :     डाक',
   '2' :   '2 :     मंजुला बहन',
   '3' :   '3 :     मनोज भाई',
   '5' :   '5 :     राजेन्',
   '6' :   '6 :     पशुपति भाई',
   '9' :   '9 :     योगेश्',
   '10' :  '10 :    पवन विश्',
   '12' :  '12 :    सुदीप भार्इ',
   '13' :  '13 :    अर्जुन भाई',
   '14' :  '14 :    साध्',
   '15' :  '15 :    प्रेमलता बहन',
   '16' :  '16 :    बैजंती बहन',
   '17' :  '17 :    धर्मशीला बहन',
   '18' :  '18 :    वीणा बहन',
   '19' :  '19 :    निर्मला बहन',
   '20' :  '20 :    संजय भाई',
   '22' :  '22 :    कमलेश भाई',
   '23' :  '23 :    विनय भाई',
   '24' :  '24 :    मौर्या भाई',
   '25' :  '25 :    मीना बहन',
   '26' :  '26 :    सियाशरण भाई',
   '27' :  '27 :    पुष्',
   '28' :  '28 :    वीणा बहन',
   '29' :  '29 :    किरण बहन',
   '30' :  '30 :    मंजु बहन',
   '31' :  '31 :    अशोक भदानी',
   '33' :  '33 :    चंद्रावती बहन',
   '34' :  '34 :    नितेश भाई',
   '35' :  '35 :    दयाशंकर भाई',
   '36' :  '36 :    जय प्रकाश भाई ( शिक्षक)',
   '37' :  '37 :    राजकुमारी बहन',
   '38' :  '38 :    शशि बहन',
   '39' :  '39 :    नितेश भाई',
   '40' :  '40 :    दमयंती बहन',
   '41' :  '41 :    अनुज भाई',
   '42' :  '42 :    सावित्री बहन',
   '43' :  '43 :    टुंडी',
   '44' :  '44 :    बोकारो',
   '45' :  '45 :    अनीता बहन',
   '46' :  '46 :    संजय भाई',
   '47' :  '47 :    अरुण भाई',
   '48' :  '48 :    रूबी बहन',
   '49' :  '49 :    वंदना बहन',
   '50' :  '50 :    दशरथ भाई ',
   '51' :  '51 :    राजेश कुमार',
   '52' :  '52 :    निभा बहन',
   '53' :  '53 :    संतोष भाई',
   '54' :  '54 :    नवीण भाई',
   '55' :  '55 :    दिनेश भाई',
   '56' :  '56 :    प्रदीप भाई',
   '57' :  '57 :    कैलाश भाई',
   '58' :  '58 :    गणेश भाई',
   '59' :  '59 :    सुनीता बहन',
   '60' :  '60 :    कुमकुम बहन',
   '61' :  '61 :    महेश भाई',
   '62' :  '62 :    दिलीप भाई',
   '63' :  '63 :    एन. के. वर्मा भाई',
   '64' :  '64 :    मंजु बहन',
   '65' :  '65 :    नरेश भाई',
   '66' :  '66 :    नमिता बहन',
   '67' :  '67 :    आरती बहन',
   '68' :  '68 :    नमन भाई',
   '69' :  '69 :    रंजीत भाई',
   '70' :  '70 :    शशिकांत भाई',
   '72' :  '72 :    धनंजय भाई',
   '73' :  '73 :    आनंद भाई',
   '74' :  '74 :    रामलग्',
   '75' :  '75 :    धनंजय भाई',
   '76' :  '76 :    विपिन भाई',
   '77' :  '77 :    देवेन्',
   '78' :  '78 :    शकुन्',
   '7' :   '7 :     संजय भाई (LIC)',
   '11' :  '11 :    अमित भाई',
   '71' :  '71 :    प्रकाश भाई',
   '32' :  '32 :    SriRam Bhai',
   '8' :   '8 :     सुनंदा बहन',
   '79' :  '79 :    अयोध्',
   '80' :  '80 :    राजेश भाई',
   '81' :  '81 :    पुष्',
   '82' :  '82 :    मनोज भाई',
   '83' :  '83 :    गुड्डी बहन',
   '84' :  '84 :    श्रीकांत भाई',
   '85' :  '85 :    जानकी बहन',
   '86' :  '86 :    रेखा बहन',
   '87' :  '87 :    रेणु बहन',
   '88' :  '88 :    विभा बहन',
   '89' :  '89 :    पुष्',
   '90' :  '90 :    सचिदानंद भाई',
   '91' :  '91 :    मंजु बहन',
   '92' :  '92 :    नीलम बहन',
   '94' :  '94 :    पुरुषोत्तम भाई',
   '95' :  '95 :    भोला शंकर भाई',
   '96' :  '96 :    सुनयना बहन',
   '97' :  '97 :    मंजु सहाय',
   '98' :  '98 :    सविता बहन',
   '99' :  '99 :    मंजु बहन',
   '100' : '100 :   सुजीत भाई',
   '101' : '101 :   बिंदेश्',
   '102' : '102 :   दिंजु बहन',
   '103' : '103 :   दयानंद भाई',
   '104' : '104 :   मोहन भाई',
   '105' : '105 :   गौरी शंकर भाई',
   '106' : '106 :   राजेश भाई',
   '107' : '107 :   भारती सिंह',
   '108' : '108 :   चिरकी',
   '109' : '109 :   अनुप भाई',
   '110' : '110 :   सुमित्रा बहन',
   '111' : '111 :   जगदम्बा बहन',
   '112' : '112 :   भारती गुप्',
   '113' : '113 :   अनीता बहन',
   '114' : '114 :   नवीन भाई',
   '115' : '115 :   संगीता बहन ',
   '116' : '116 :   उषा बहन',
   '117' : '117 :   रूपा बहन',
   '118' : '118 :   सुरेंद्र भाई',
   '119' : '119 :   आरती बहन',
   '120' : '120 :   अखिलेश भाई',
   '121' : '121 :   दिवाकर भाई',
   '122' : '122 :   उषा बहन',
   '123' : '123 :   ब्रहमदेव भाई',
   '124' : '124 :   मंजू बहन',
   '125' : '125 :   दिलीप भाई',
   '126' : '126 :   हेमंत भाई',
   '127' : '127 :   पोस्ट द्वारा',
   '129' : '129 :   लोकेस भाई',
   '130' : '130 :   अनीता बहन',
   '131' : '131 :   पुष्पा बहन',
   '132' : '132 :   अजय भाई',
   '133' : '133 :   अमृता बहन',
   '134' : '134 :   नितेश भार्इ',
   '135' : '135 :   अजय सिंह',
   '136' : '136 :   राकेश भाई',
   '137' : '137 :   रेणु बहन',
   '138' : '138 :   शैलेंद्र भाई',
   '139' : '139 :   रितेश',
   '140' : '140 :   किरण बहन',
   '141' : '141 :   विनय भदानी',
   '142' : '142 :   लालजीत भाई',
   '143' : '143 :   हरेन्द्र भाई',
   '144' : '144 :   सिद्धेश्वर भाई',
   '145' : '145 :   मंजु बहन, मीरा तिवारी',
   '146' : '146 :   शिव भाई, लालजीत भाई',
   '147' : '147 :   घाघरा',
   '148' : '148 :   रेणूका बहन',
   '149' : '149 :   डी. के. जयसवाल भाई',
   '150' : '150 :   कोरियर',
   '151' : '151 :   संगीता बहन ',
   '152' : '152 :   मीरा बहन',
   '153' : '153 :   अरूणा बहन',
   '154' : '154 :   संजय भाई',
   '155' : '155 :   नितेश',
   '128' : '128 :   सचिदानंद भाई',
   '156' : '156 :   गुड्डी बहन, चाईबासा',
   '157' : '157 :   प्रचार प्रसार',
   '158' : '158 :   गजेंद्र भाई',
   '159' : '159 :   प्रतीमा बहन',
   '160' : '160 :   शैलेश भाई',
   '161' : '161 :   कृतिनारायण भाई',
   '162' : '162 :   वेन (महाबिगहा)',
   '163' : '163 :   मंजू बहन',
   '164' : '164 :   अनुराधा बहन ',
   '165' : '165 :   अनुप भाई ',
   '166' : '166 :   गुड्डू भाई ',
   '167' : '167 :   राखी भदानी',
   '168' : '168 :   उपेन्द्र भाई',
   '169' : '169 :   विकास भाई',
   '170' : '170 :   घनंजय',
   '171' : '171 :   वंदना बहन',
   '172' : '172 :   रेणु देवी',
   '173' : '173 :   रेणु बहन',
   '174' : '174 :   पिंकी बहन',
   '175' : '175 :   सचिन्',
   '176' : '176 :   सत्',
   '177' : '177 :   विक्',
   '178' : '178 :   अजय सिंह',
   '179' : '179 :   अजय  भाई ',
   '180' : '180 :   अजय  भाई ',
   '181' : '181 :   अजय  भाई ',
   '182' : '182 :   अजय  भाई ',
   '183' : '183 :   लालती देवी',
   '184' : '184 :   उदय नारायण सिंह',
   '185' : '185 :   रांची - नीरज',
   '186' : '186 :   आशीष',
   '187' : '187 :   श्रीजी स्वीट्स',
   '188' : '188 :   अंजना बहन',
   '189' : '189 :   स्मिता बहन',
   '191' : '191 :   नारायण भाई',
   '192' : '192 :   विनोद कु. जायसवाल',
   '193' : '193 :   सुमन बहन',
   '194' : '194 :   हलधर यादव',
   '195' : '195 :   सीताराम अग्रवाल',
   '196' : '196 :   विरेंद्र राम',
   '197' : '197 :   वीणा बहन',
   '4' :   '4 :     रामदुलार भाई',
   '198' : '198 :   इंदु बहन',
   '190' : '190 :   राजकुमार भाई',
   '21' :  '21 :    मीना कपिस्वे बहन',
   '199' : '199 :   शंभु चरणपहाड़ी',
   '93' :  '93 :    श्री राम भाई',
}