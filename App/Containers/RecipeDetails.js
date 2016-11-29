// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ListView } from 'react-native'
import styles from './Styles/RecipeDetailsStyle'
import Config from 'react-native-config'
import RecipeDetailsActions from '../Redux/RecipeDetailsRedux'

let recipeBody
let testState = {
  f2f_url:"http://food2fork.com/view/47024",
  image_url:"http://static.food2fork.com/icedcoffee5766.jpg",
  ingredients:["my ingredient","1 pound Ground Coffee (good, Rich Roast)","8 quarts Cold Water","Half-and-half (healthy Splash Per Serving)","Sweetened Condensed Milk (2-3 Tablespoons Per Serving)","Note: Can Use Skim Milk, 2% Milk, Whole Milk, Sugar, Artificial Sweeteners, Syrups...adapt To Your Liking!"],
  publisher:"The Pioneer Woman",
  publisher_url:"http://thepioneerwoman.com",
  recipe_id:"47024",
  social_rank:100,
  source_url:"http://thepioneerwoman.com/cooking/2011/06/perfect-iced-coffee/",
  title: "Perfect Iced Coffee",
}
class RecipeDetails extends React.Component {
  state: {
    f2f_url:"",
    image_url: "",
    ingredients: [],
    publisher:"",
    publisher_url:"",
    recipe_id:0,
    social_rank:0,
    source_url:"",
    title:"",
  }
  constructor(props){
    super(props)
    this.state = null
    //setTimeout(() => this.parseRecipe(testState)); return
    // called here for initialization, componentWillReceiveProps is not called
    this.getDetails(props.data)
  }

  componentWillReceiveProps (newProps){
    console.log(newProps.recipeDetails == this.props.recipeDetails)
    console.log(newProps.data == this.props.data)
    if(newProps.recipeDetails != this.props.recipeDetails)
      return true

    if(newProps.data == this.props.data){
      this.props.recipeDetailsSuccess(this.props.data)
      return false
    }else{
      this.getDetails(newProps.data)
      return true
    }
  }

  getDetails (data){
    fetch(`http://food2fork.com/api/get?key=${Config.API_KEY}&rId=${data}`)
      .then(function(response){
        return response.json()
      })
      .then((data) => {
        this.props.recipeDetailsSuccess(data)
      })
      .catch(function(err){
        error(err)
      })
  }

  render () {
    let { recipeDetails } = this.props
    return (
      !recipeDetails ? <View style={styles.container}/> :
      <View style={styles.container}>
        <Image
          style={styles.recipeImage}
          source={{uri: recipeDetails.image_url}}
        />
        <View>
          <Text style={styles.sectionText}>{recipeDetails.title}</Text>
        </View>

          {/*<ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Result data={rowData} getRecipeDetails={this.props.getRecipeDetails} />}
            enableEmptySections
            pageSize={15}
          />*/}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    recipeDetails: state.recipeDetails.payload && state.recipeDetails.payload.recipe ? state.recipeDetails.payload.recipe : null,

    recipeData: state.recipeDetails.data,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    recipeDetailsSuccess: (data) => dispatch(RecipeDetailsActions.recipeDetailsSuccess(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails)
