def time_to_save():
    annual_salary = float(input("Enter your annual salary: "))
    portion_saved = float(input("Enter the percent of your salary to save, as a decimal: "))
    total_cost = float(input("Enter the cost of your dream home: "))
    portion_down_payment = 0.25
    down_payment = portion_down_payment*total_cost
    current_savings = 0
    r = 0.04
    no_months = 0
    while current_savings < down_payment:
        current_savings += ((current_savings)*(r/12)) + ((portion_saved*annual_salary)/12)
        no_months += 1
    print(f"Number of months: {no_months}")

time_to_save()