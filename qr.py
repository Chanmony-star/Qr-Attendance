import qrcode
#Put your school WiFi IP + website path here
data = " " #wait for link with our website and put shcool wifi ip address here 
qr = qrcode.make(data)
qr.save("attendance_qr.png")
print("QR code created: attendance_qr.png")
