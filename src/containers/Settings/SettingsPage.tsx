import {Component} from 'react'
import PageWithNav from '../../components/NavBar/PageWithNav';
import {Button, CircularProgress, Grid, TextField, Zoom} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import {colors} from "../../default_color";
import IGenre from "../../data_interface/IGenre"
import {Autocomplete} from "@material-ui/lab";
import UserHelpers from "../../helpers/UserHelpers";
import GenreHelpers from '../../helpers/GenreHelpers';

interface IState{
    showGenreSelector: boolean;
    newGenres: string[];
    genreList?:IGenre[];
}

class SettingsPage extends Component<any, IState> {
    constructor(props:any) {
        super(props);
        this.state = {
            showGenreSelector: false,
            newGenres: [],
        }
    }

    componentDidMount = () => {
        
        GenreHelpers.getAllGenres().then(resp =>{
            this.setState({genreList: resp.data})
        })
    }

    showGenreSelector = () => {
        this.setState({showGenreSelector: true})
    }

    changeGenreHandler = async (event: any, newValues: IGenre[]) => {
        const genresCopy: string[] = []

        newValues.forEach(genre => {
            genresCopy.push(genre.nameGenre)
        });
        await this.setState({newGenres: genresCopy})
    }

    confirm = (e: any) => {
        e.preventDefault()
        let userId = 4
        let list = this.state.newGenres
        UserHelpers.resetUserGenres(userId, list).then(res => {
            console.log("Done !")
            // this.props.history.push('/profile')
        })
    }

    render() {
        const button =
            <Grid container xs={12}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{padding:"4%"}}>
                <Button variant="contained"
                               color="primary"
                               size="large"
                               style={{color:colors.white}}
                               onClick={this.showGenreSelector}>
                            Réinitialiser mes préférences
                </Button>
            </Grid>

        const genreSelector = (this.state.genreList) ? (<Zoom in={this.state.showGenreSelector}>
            <Grid container xs={12}
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    style={{padding:"1%"}}>
                                <Autocomplete
                                    multiple
                                    size="small"
                                    id="tags-outlined"
                                    options={this.state.genreList}
                                    getOptionLabel={(option) => option.nameGenre}
                                    filterSelectedOptions
                                    style={{width:"450px"}}
                                    onChange={this.changeGenreHandler}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Nouveaux genres"
                                            placeholder="Nouveaux genres"
                                        />
                                    )}
                                />
                                <br/>
                                <Button variant="contained"
                                        color="primary"
                                        size="large"
                                        style={{color:colors.white}}
                                        onClick={this.confirm}>
                                    Confirm
                                </Button>
            </Grid>
        </Zoom>) : (<CircularProgress color="primary"/>)

        const resetArea = ( !this.state.showGenreSelector ? button : genreSelector)
        return (
            <PageWithNav selected={4}>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      style={{height:'100%'}}>
                    <Grid container xs={12}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-end"
                          style={{height:'12%'}}>
                        <Grid container
                              direction="row"
                              justify="flex-start"
                              alignItems="center"
                              xs={4}
                              style={{height:'100%',paddingLeft:"2em"}}>
                            <SettingsIcon color="primary" fontSize="large"/>
                            <h1 style={{color:colors.orangeButton}}>Paramètres</h1>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start"
                          spacing={0}
                          style={{height:'85%', padding:"5%"}}>
                        {/*<Grid item xs={12} style={{height:'42%'}}>*/}

                        {/*</Grid>*/}
                        {/*<div style={{height:'0px', width:"100%", border:"1px solid", borderColor:colors.orangeButton}}/>*/}
                        <Grid container xs={12}
                              direction="row"
                              justify="flex-start"
                              alignItems="flex-start"
                              style={{height:'35%', padding:"5%"}}>
                            <Grid container xs={6}
                                  justify="flex-start"
                                  alignItems="flex-start">
                                <h3 style={{color:colors.orangeButton}}>A propos des recommandations</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <h4 style={{color:colors.purple}}>
                                    Votre fil de recommandation est personnalisé en fonction de vos goûts et de vos habitudes de choix dans le but de votre offrir des recommandations tes plus pertinentes possibles. Si vous estimez que vos recommandations ne correspondent plus à vos envies du moments. vous pouvez réinitialiser votre fil de recommandation à l'aide du bouton ci-dessous. Attention cette opération est définitive.
                                </h4>
                            </Grid>
                            {resetArea}
                        </Grid>
                    </Grid>
                </Grid>
            </PageWithNav>
        );
    }
}

export default SettingsPage;