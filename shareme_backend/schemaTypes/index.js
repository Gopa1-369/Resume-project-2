// Import individual schemas
import user from './user'; // Ensure this path is correct
import pin from './pin'
import comment from './comment'
import postedBy from './postedBy'
import save from './save'


// Export as an array
const schemaTypes = [
  user,
  pin,
  comment,
  postedBy,
  save
  // Add other schemas here if necessary
];

export default schemaTypes; // Make sure to export it as default
