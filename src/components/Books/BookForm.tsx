import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, {Component} from "react";
import { ITextField } from "../Form/IFormTextField";
import { colors } from "../../default_color";
import { IBookFormProps, IBookFormStates, ILink } from "./IBookForm";
import * as locales from '@material-ui/core/locale';
import IGenre from "../../data_interface/IGenre";

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import { Link, withRouter } from "react-router-dom";
import IBook from "../../data_interface/IBook";
import BookHelpers from "../../helpers/BookHelpers";
import GenreHelpers from "../../helpers/GenreHelpers";

let textFields: ITextField[];
let jsxTextFields:JSX.Element[];
let deleteButton: JSX.Element = <></>;
class BookForm extends Component<IBookFormProps, IBookFormStates> {
    constructor(props: IBookFormProps) {
        super(props);

        this.state = { titleBook:"", firstChapter: "", imageBook: "", language: "", links: [], summaryBook:"", genres: [], openDialog:false };

        if(this.props.book){
            const links:ILink[] = []
            
            const recordLinks = this.props.book.links
            Object.keys(recordLinks).forEach(key => links.push({
                name: key,
                url: recordLinks[key]
            }))



            this.state = { 
                titleBook: this.props.book.titleBook, 
                firstChapter: this.props.book.firstChapter, 
                imageBook: this.props.book.imageBook, 
                language: this.props.book.language, 
                links: links, 
                summaryBook:this.props.book.titleBook, 
                genres: [],
                openDialog:false,
            };
        }

        this.changeTitleHandler.bind(this);
        this.changeImageBookHandler.bind(this);
        this.changeSummaryHandler.bind(this);
        this.changeGenreHandler.bind(this);
        this.changeFirstChapterHandler.bind(this);
        this.changeLanguageHandler.bind(this);
        this.handleOpen.bind(this);
        this.handleClose.bind(this);
        this.deleteBook.bind(this);
        this.submit.bind(this);
    }

    componentDidMount = () => {
        
        GenreHelpers.getAllGenres().then(resp =>{
            this.setState({genreList: resp.data})
        })
    }

    initFields(){
        if(this.props.book){
            textFields=[
                {name: "title", label:"Titre", onChange:this.changeTitleHandler, default:this.props.book.titleBook},
                {name: "imageLink", label:"Lien de l'image de couverture", onChange:this.changeImageBookHandler, default:this.props.book.imageBook},
                {name: "summaryBook", label: "Résumé", onChange:this.changeSummaryHandler, multiline: true, row: 5, default:this.props.book.summaryBook},
                {name: "firstChapter", label: "Premier Chapitre", onChange:this.changeFirstChapterHandler, multiline: true, row: 20, default:this.props.book.firstChapter},
            ];

            
        }else{
            textFields=[
                {name: "title", label:"Titre", onChange:this.changeTitleHandler},
                {name: "imageLink", label:"Lien de l'image de couverture", onChange:this.changeImageBookHandler},
                {name: "summaryBook", label: "Résumé", onChange:this.changeSummaryHandler, multiline: true, row: 5},
                {name: "firstChapter", label: "Premier Chapitre", onChange:this.changeFirstChapterHandler, multiline: true, row: 20,},
            ];
        }

        jsxTextFields = textFields.map(field =>
            <Grid item xs={12}>
                <TextField
                    onChange={field.onChange}
                    autoComplete={(field.autocomplete !== undefined) ? field.autocomplete : ""}
                    name={field.name}
                    variant="outlined"
                    required
                    fullWidth
                    id={field.name}
                    label={field.label}
                    defaultValue={(field.default !== undefined) ? field.default : ""}
                    multiline={(field.multiline !== undefined) ? field.multiline : false}
                    rows={field.row}                  
                />
            </Grid>
        )
    }

    initButtons = () =>{
        deleteButton = (this.props.edit) ? (
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="medium"
                        startIcon={<DeleteIcon />}
                        onClick={this.handleOpen}
                    >
                        Supprimer le livre
                    </Button>
                    
                </div>
            ) : <></>;
    }

    changeGenreHandler = (event: any, newValues: IGenre[]) => {       
        this.setState({genres: newValues})
    }

    changeTitleHandler = (event: any) => {       
        this.setState({titleBook: event.target.value})
    }

    changeImageBookHandler = (event: any) => {       
        this.setState({imageBook: event.target.value})
    }

    changeSummaryHandler = (event: any) => {       
        this.setState({summaryBook: event.target.value})
    }

    changeFirstChapterHandler = (event: any) => {
        this.setState({firstChapter: event.target.value})
    }

    changeLanguageHandler = (event:any, newValue:any) => {
        this.setState({language: newValue})
    }

    handleOpen = () => {
        this.setState({openDialog:true})
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }

    deleteBook = () => {
        if(this.props.book && this.props.book.idBook){
            BookHelpers.deleteBook(this.props.book.idBook).then(res =>{
                if(res.data.deleted){
                    console.log("Suppression réussite");
                    this.props.history.push("/profile");
                }
                else{
                    console.error("Echecs de la suppression")
                }
                    
            }).catch(error => {
                console.error("Echecs de la suppression")
            });
        }

        this.setState({openDialog:false})
    }

    submit = (e:any) => {
        let links:Record<string, string> = {}
        this.state.links.map((link) => {
            links[link.name] = link.url;
        })
        let book:IBook;

        e.preventDefault();
        if(this.props.book){
            book = this.props.book;

            book.titleBook= this.state.titleBook;
            book.imageBook= this.state.imageBook;
            book.language= this.state.language;
            book.links= links;
            book.summaryBook= this.state.summaryBook;
            book.firstChapter= this.state.firstChapter;
        }else{
            book = {
                titleBook: this.state.titleBook,
                imageBook: this.state.imageBook,
                language: this.state.language,
                links: links,
                summaryBook: this.state.summaryBook,
                firstChapter: this.state.firstChapter,
            }
        }
        this.props.onSubmitHandler(book);
    }

    deleteLink = (linkNumber: number) => {
        const newLinks: ILink[] = this.state.links;
        newLinks.splice(linkNumber, 1);
        this.setState({links:newLinks})
    }

    addLink = () => {
        const newLinks = this.state.links;
        newLinks.push({
            url:"",
            name:""
        });
        this.setState({links:newLinks});
    }

    handleLinkName = (e:any, index:number) => {
        const newLinks = this.state.links;
        newLinks[index].name = e.target.value;
        this.setState({links:newLinks});
    }

    handleLinkUrl = (e:any, index:number) => {
        const newLinks = this.state.links;
        newLinks[index].url = e.target.value;
        this.setState({links:newLinks});
    }

    render() {

        this.initFields()
        this.initButtons()
        return (
            <div>
                <Grid container spacing={2}  alignItems="center">
                    {jsxTextFields}
                
                    <Grid item xs={12}>
                        <Autocomplete
                            id="language"
                            options={Object.keys(locales)}
                            getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                            style={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Langue" variant="outlined" />}
                            onChange={this.changeLanguageHandler}
                            value={this.state.language}
                        />
                    </Grid>
                    {
                        (this.state.genreList) ? (
                            <Grid item xs={12}>
                                <Autocomplete
                                    aria-required
                                    multiple
                                    id="tags-outlined"
                                    options={this.state.genreList}
                                    getOptionLabel={(option) => option.nameGenre}
                                    filterSelectedOptions
                                    onChange={this.changeGenreHandler}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Genres"
                                            placeholder="Book genres"
                                        />
                                    )}
                                />
                            </Grid>
                        ) : (
                            <CircularProgress color="primary"/>
                        )
                    }
                    
                    
                    {this.state.links.map((genre, index) => (
                        <Grid item xs={12}>
                            <Grid container direction="row">
                                <Grid item xs={5}><TextField onChange={(e:any) => this.handleLinkName(e, index)} label="Nom du lien" name="marketName" value={genre.name} required/></Grid>
                                <Grid item xs={5}><TextField onChange={(e:any) => this.handleLinkUrl(e, index)} label="Url" name="url" value={genre.url} required/></Grid>
                                <Grid item xs>
                                    <IconButton aria-label="delete" color="primary" onClick={() => this.deleteLink(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button style={{color:"white", marginLeft:8}} variant="contained" color="primary" onClick={this.addLink}>Ajouter un lien</Button>
                    </Grid>
                    
                </Grid>
                <Grid style={{marginTop:"20px"}} container justify="space-around"  alignItems="center" spacing={0}>
                    <Grid style={{marginTop:"20px"}} container direction="row" justify="space-around" spacing={0}>
                        <Button
                            style={{color:"white"}}
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                            onClick={this.submit}
                            type="submit"
                        >
                            Sauvegarder
                        </Button>
                        {(this.props.edit) ? deleteButton : <></>}
                        
                        <Link to="/profile" style={{textDecoration:"none"}}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="medium"
                                startIcon={<PersonIcon />}
                            >
                                Revenir au profil
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                {(this.props.edit) ? (
                    <Dialog
                        open={this.state.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Etes-vous sûr de vouloir supprimer le livre"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Il ne sera plus possible de récupérer les données du livre une fois qu'il est supprimé
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={this.deleteBook} color="primary" autoFocus>
                                Supprimer
                            </Button>
                        </DialogActions>
                    </Dialog>
                ) : <></>}
                
               
            </div>
        );
    }
}

export default withRouter(BookForm);