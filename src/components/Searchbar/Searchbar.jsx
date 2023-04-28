// import { Component } from 'react';
// import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

// export class Searchbar extends Component {
//   state = {
//     searchImag: '',
//   };

//   handleNameChange = e => {
//     this.setState({ searchImag: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.searchImag.trim() === '') {
//       toast.warn('Please put something');
//       return;
//     }

//     this.props.onSubmit(this.state.searchImag);
//     this.setState({ searchImag: '' });
//   };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form onSubmit={this.handleSubmit} className={css.SearchForm}>
//           <button type="submit" className={css.SearchFormButton}>
//             <span className={css.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             name="searchImag"
//             value={this.state.searchImag}
//             onChange={this.handleNameChange}
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.Searchbar}>
      <form onSubmit={onSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          name="searchImag"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
