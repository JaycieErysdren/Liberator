module.exports = {
    fileSize: function(size) {
        if (size > 1000000) {
            return (size / 1000000).toFixed(2).toString() + " megabytes"
        } else if (size > 1000) {
            return (size / 1000).toFixed(2).toString() + " kilobytes"
        } else {
            return size.toString() + " bytes"
        }
    }
}