const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    marginTop:"50px"
  },
  navbar: {
    backgroundColor: "#007bff",
    padding: "10px 20px",
    position: "fixed",  
    top: 0,             
    left: 0,            
    width: "100%",      
    zIndex: 1000,       
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",    
    alignItems: "center", 
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    margin: "0 10px",
  },
  separator: {
    color: "#fff",
    margin: "0 5px",
  },
  main: {
    flex: 1,
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  userIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '30%',
    objectFit: 'cover',
    marginLeft:'1200px', 
  },

    
    modalOverlay: {
      position: "absolute",
      top: "50px", 
      right: "10px", 
      zIndex: 1000, 
    },
    
  
    modalContent: {
      backgroundColor: "white",
      padding: "8px",
      borderRadius: "8px",
      width: "120px",
      textAlign: "center",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
};

export default styles;
