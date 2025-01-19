<script>  
    let pageNumber = ''; // Variable to hold the input value  
    let isButtonDisabled = true; // Variable to control button state  
    let errorMessage = ''; // Variable to hold error message  
  
    // Reactive statement to enable/disable the button based on input  
    $: isButtonDisabled = !pageNumber || pageNumber < 1 || pageNumber > 604; // Button is disabled if pageNumber is empty or out of range  
  
    const handleSubmit = () => {  
        // Redirect to the desired page  
        window.location.href = `/quran/${pageNumber}`;  
    };  
  
    // Reactive statement to set error message based on input  
    $: {  
        if (pageNumber > 604) {  
            errorMessage = 'Halaman hanya sampai 604';  
        } else {  
            errorMessage = ''; // Clear error message if input is valid  
        }  
    }  
</script>  
  
<div  
    class="modal fade"  
    id="inputpagenumber"  
    tabindex="-1"  
    aria-labelledby="exampleModalLabel"  
    aria-hidden="true"  
>  
    <div class="modal-dialog modal-dialog-centered modal-sm">  
        <div class="modal-content rounded-4">  
            <div class="modal-body text-center">  
                <input  
                    type="number"  
                    class="form-control"  
                    id="exampleFormControlInput1"  
                    placeholder="Masukkan halaman yang ingin dituju"  
                    bind:value={pageNumber} 
                    min="1" 
                    max="604" 
                />  
                {#if errorMessage}  
                    <p class="text-danger mt-2">{errorMessage}</p> <!-- Display error message if exists -->  
                {/if}  
            </div>  
            <div class="modal-footer d-flex justify-content-center">  
                <button   
                    type="button"   
                    class="btn btn-sm btn-success"   
                    on:click={handleSubmit}   
                    disabled={isButtonDisabled}
                >  
                    Kirim  
                </button>  
            </div>  
        </div>  
    </div>  
</div>  
  
<style>  
    p {  
        margin: 0px;  
        font-size: 0.8rem;  
    }  
</style>  
