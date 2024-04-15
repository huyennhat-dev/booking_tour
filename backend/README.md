
1 tour thì chỉ có 1 manager và 1 staff


một thằng manager thì quản lý nhiều staff
một thằng staff thì có nhiều tour
một thằng manager thì có nhiều tour 

# user        |   #manager           | #customers   | # staff
id            |  id_manager          |              | id_staff
password      |  company_name        | id_customer  | id_manager
email         |  point_evaluation    | full_name    | full_name
phone_number  |  full_name           | birth_day    | birth_day
role          |                      |              | point_evaluation   
use_name

# tour
id tour
id manager
id staff
departure_day
departure
destination
inital_price
promotional_price (giá khuyến mại)
promotional
introduce
highlight
insurance (bảo hiểm)
bus
bicycle
taxi
plane
meal
photos
tour_guide (dư không cần thiết vì đã có id_staff )

#book_tour
id_booked_tord
id_tord
id_customer
guest_number
date_booked 
compelete
evaluate
point_evaluate




# team ( đổi tên lại của assigns)
id_team
id_manager
id_staff
work_day (??? chưa hiểu ý nghĩa lắm)



