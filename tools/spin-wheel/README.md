# Spin Wheel Tool

A weighted random selector with URL synchronization and smooth physics-based spinning animation.

## Features

- **Weighted Selection** - Each option can have a different probability
- **URL Sync** - Share your spin wheel configuration via URL
- **Recent Avoidance** - Optionally avoid repeating recent results
- **Smooth Animation** - Physics-based easing for realistic spinning
- **Responsive Design** - Works on desktop and mobile

## How to Use

1. **Add Options** - Click "+ Add" to add new items to the wheel
2. **Set Weights** - Adjust the weight for each option (higher = more likely)
3. **Enable/Disable** - Toggle options on/off
4. **Spin** - Click the SPIN button to select a random option
5. **Share** - Copy the URL to share your wheel configuration

## Configuration

- **Text**: The label shown on the wheel
- **Weight**: Probability weight (relative value, not percentage)
- **Enabled**: Toggle to include/exclude from spinning
- **Avoid Recent**: Number of recent results to avoid repeating

## Examples

- **Equal probability**: Set all weights to 1
- **Weighted lottery**: Use different weights (e.g., 1, 2, 5, 10)
- **Disable options**: Uncheck to temporarily exclude without deleting

## Tips

- Weights are relative, so 2, 4, 6 is the same as 1, 2, 3
- The wheel auto-relaxes avoidance rules if there aren't enough enabled options
- URLs preserve your entire wheel state for sharing
