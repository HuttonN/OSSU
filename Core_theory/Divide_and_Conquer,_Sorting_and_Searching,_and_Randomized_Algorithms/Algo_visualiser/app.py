from flask import Flask, render_template, jsonify

app = Flask(__name__, static_url_path='/static')

def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    left_half = merge_sort(left_half)
    right_half = merge_sort(right_half)

    return merge(left_half, right_half)

def merge(left, right):
    merged = []
    left_index, right_index = 0, 0

    while left_index < len(left) and right_index < len(right):
        if left[left_index] < right[right_index]:
            merged.append(left[left_index])
            left_index += 1
        else:
            merged.append(right[right_index])
            right_index += 1

    merged += left[left_index:]
    merged += right[right_index:]

    return merged

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/execute_algorithm', methods=['POST'])
def execute_algorithm():
    input_list = [9, 3, 6]  # Pre-defined input list
    execution_steps = [] # Store the execution
    merge_sort_visualization(input_list, 0, len(input_list) - 1, execution_steps)
    return jsonify(execution_steps)

def merge_sort_visualization(arr, start, end, execution_steps):
    if start >= end:
        return

    mid = (start + end) // 2

    merge_sort_visualization(arr, start, mid, execution_steps)
    merge_sort_visualization(arr, mid + 1, end, execution_steps)

    left_half = arr[start:mid + 1]
    right_half = arr[mid + 1:end + 1]

    execution_steps.append({
        'left_half': left_half,
        'right_half': right_half,
        'merged_list': merge(left_half, right_half),
        'merge_at': (start, mid, end)
    })

if __name__ == '__main__':
    app.run(debug=True)