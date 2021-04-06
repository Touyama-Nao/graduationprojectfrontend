module.exports={
	devServer:{},
	 configureWebpack: {
    	name: name,
   		resolve: {
      	alias: {
       	 '@': resolve('src')
      }
    }
  },
}