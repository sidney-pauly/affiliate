import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      productFilter: {
        query: ''
      },
      products: [],
      productFilterLoading: false
    }),
    mutations: {
      updateProductFilter (state, payload){
        state.productFilter = payload;
      },
      updateProducts (state, payload){
        state.products = payload;
      },
      updateProductFilterLoading (state, payload){
        state.productFilterLoading = payload;
      }
    },
    actions: {
      getProducts (context, productFilter){
        //Commit product filter
        context.commit('updateProductFilterLoading', true);
        context.commit('updateProductFilter', productFilter);

        //Fetch data from backend
        return axios.get('http://localhost:3001/affilinet?' + 'query=' + productFilter.query)
        .then((res) => {
          context.commit('updateProducts', res.data);
          context.commit('updateProductFilterLoading', false);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
        })
      }
    }
  })
}

export default createStore
