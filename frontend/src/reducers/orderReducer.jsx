import Orders from "../pages/Orders";

export const placeOrderReducer=(state={},action) =>{

    switch(action.type){

        case 'PLACE_ORDER_REQUEST' : return{
            loading:true
        }
        case 'PLACE_ORDER_SUCCESS' : return{
            loading:false,
            success:true
        }
        case 'PLACE_ORDER_FAILED' : return{
            loading:false,
            
            error:action.payload
            
        }
        default:
      return state;
    }

}


export const getUserOrdersReducer=(state={orders:[]},action) =>{

    switch(action.type){

        case 'GET_USER_ORDER_REQUEST' : return{
            loading:true,
            ...state

        }
        case 'GET_USER_ORDER_SUCCESS' : return{
            loading:false,
            orders:action.payload
            
        }
        case 'GET_USER_ORDER_FAILED' : return{
            loading:false,
            error:action.payload
            
        }
        default:
            //console.log(action.payload)
      return state;
    }

}

export const getAllOrdersReducer=(state={orders:[]},action) =>{

    switch(action.type){

        case 'GET_ALL_ORDER_REQUEST' : return{
            loading:true,
            ...state

        }
        case 'GET_ALL_ORDER_SUCCESS' : return{
            loading:false,
            orders:action.payload
            
        }
        case 'GET_ALL_ORDER_FAILED' : return{
            loading:false,
            error:action.payload
            
        }
        default:
            //console.log(action.payload)
      return state;
    }

}

export const updateOrderReducer=(state={},action) =>{

    switch(action.type){

        case 'UPDATE_ORDER_REQUEST' : return{
            loading:true
        }
        case 'UPDATE_ORDER_SUCCESS' : return{
            loading:false,
            success:true
        }
        case 'UPDATE_ORDER_FAILED' : return{
            loading:false,
            
            error:action.payload
            
        }
        default:
      return state;
    }

}