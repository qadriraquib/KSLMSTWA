import { DynamicTable } from "@/components/DynamicTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data sets
const employeeData = [
  { id: 1, name: "John Doe", department: "Engineering", position: "Senior Developer", salary: 95000, email: "john.doe@example.com", joining_date: "2020-01-15", experience: 8 },
  { id: 2, name: "Jane Smith", department: "Marketing", position: "Marketing Manager", salary: 85000, email: "jane.smith@example.com", joining_date: "2019-03-22", experience: 10 },
  { id: 3, name: "Bob Johnson", department: "Engineering", position: "DevOps Engineer", salary: 90000, email: "bob.j@example.com", joining_date: "2021-06-10", experience: 6 },
  { id: 4, name: "Alice Williams", department: "HR", position: "HR Specialist", salary: 70000, email: "alice.w@example.com", joining_date: "2018-11-05", experience: 12 },
  { id: 5, name: "Charlie Brown", department: "Sales", position: "Sales Executive", salary: 75000, email: "charlie.b@example.com", joining_date: "2022-02-14", experience: 4 },
  { id: 6, name: "Diana Prince", department: "Engineering", position: "Frontend Developer", salary: 88000, email: "diana.p@example.com", joining_date: "2020-09-01", experience: 7 },
  { id: 7, name: "Ethan Hunt", department: "Operations", position: "Operations Manager", salary: 92000, email: "ethan.h@example.com", joining_date: "2017-04-20", experience: 15 },
  { id: 8, name: "Fiona Gallagher", department: "Finance", position: "Financial Analyst", salary: 82000, email: "fiona.g@example.com", joining_date: "2021-08-30", experience: 5 },
  { id: 9, name: "George Miller", department: "Engineering", position: "Backend Developer", salary: 93000, email: "george.m@example.com", joining_date: "2019-12-12", experience: 9 },
  { id: 10, name: "Hannah Montana", department: "Marketing", position: "Content Strategist", salary: 78000, email: "hannah.m@example.com", joining_date: "2022-05-18", experience: 3 },
  { id: 11, name: "Ian McKellen", department: "Engineering", position: "Tech Lead", salary: 110000, email: "ian.m@example.com", joining_date: "2016-07-25", experience: 18 },
  { id: 12, name: "Julia Roberts", department: "Customer Service", position: "Support Lead", salary: 72000, email: "julia.r@example.com", joining_date: "2020-10-08", experience: 8 },
  { id: 13, name: "Kevin Hart", department: "Sales", position: "Sales Director", salary: 105000, email: "kevin.h@example.com", joining_date: "2018-01-30", experience: 14 },
  { id: 14, name: "Laura Palmer", department: "Design", position: "UX Designer", salary: 87000, email: "laura.p@example.com", joining_date: "2021-03-15", experience: 6 },
  { id: 15, name: "Michael Scott", department: "Management", position: "Regional Manager", salary: 120000, email: "michael.s@example.com", joining_date: "2015-11-20", experience: 20 },
];

const productData = [
  { product_id: 101, product_name: "Laptop Pro 15", category: "Electronics", price: 1299.99, stock: 45, rating: 4.5, manufacturer: "TechCorp", warranty_months: 24 },
  { product_id: 102, product_name: "Wireless Mouse", category: "Accessories", price: 29.99, stock: 200, rating: 4.2, manufacturer: "Peripherals Inc", warranty_months: 12 },
  { product_id: 103, product_name: "Mechanical Keyboard", category: "Accessories", price: 89.99, stock: 78, rating: 4.7, manufacturer: "KeyMaster", warranty_months: 18 },
  { product_id: 104, product_name: "27\" Monitor", category: "Electronics", price: 349.99, stock: 30, rating: 4.6, manufacturer: "DisplayTech", warranty_months: 36 },
  { product_id: 105, product_name: "USB-C Hub", category: "Accessories", price: 49.99, stock: 150, rating: 4.3, manufacturer: "ConnectPro", warranty_months: 12 },
  { product_id: 106, product_name: "Webcam HD", category: "Electronics", price: 79.99, stock: 92, rating: 4.4, manufacturer: "VisionCam", warranty_months: 24 },
  { product_id: 107, product_name: "Desk Lamp LED", category: "Furniture", price: 34.99, stock: 120, rating: 4.1, manufacturer: "LightUp", warranty_months: 6 },
  { product_id: 108, product_name: "Ergonomic Chair", category: "Furniture", price: 299.99, stock: 25, rating: 4.8, manufacturer: "ComfortSeating", warranty_months: 60 },
  { product_id: 109, product_name: "Standing Desk", category: "Furniture", price: 449.99, stock: 18, rating: 4.7, manufacturer: "DeskRise", warranty_months: 36 },
  { product_id: 110, product_name: "Headphones Pro", category: "Electronics", price: 199.99, stock: 65, rating: 4.6, manufacturer: "AudioMax", warranty_months: 24 },
];

const studentData = [
  { student_id: "S001", name: "Arjun Kumar", grade: "10th", subject: "Mathematics", marks: 92, attendance: 95, teacher: "Mr. Sharma" },
  { student_id: "S002", name: "Priya Patel", grade: "10th", subject: "Science", marks: 88, attendance: 92, teacher: "Mrs. Reddy" },
  { student_id: "S003", name: "Rahul Singh", grade: "9th", subject: "English", marks: 85, attendance: 90, teacher: "Ms. Johnson" },
  { student_id: "S004", name: "Sneha Desai", grade: "11th", subject: "Physics", marks: 94, attendance: 97, teacher: "Dr. Kumar" },
  { student_id: "S005", name: "Vikram Rao", grade: "12th", subject: "Chemistry", marks: 91, attendance: 88, teacher: "Prof. Gupta" },
  { student_id: "S006", name: "Ananya Iyer", grade: "10th", subject: "Biology", marks: 89, attendance: 94, teacher: "Mrs. Nair" },
  { student_id: "S007", name: "Karthik Menon", grade: "11th", subject: "Mathematics", marks: 96, attendance: 96, teacher: "Mr. Sharma" },
  { student_id: "S008", name: "Divya Krishnan", grade: "9th", subject: "History", marks: 87, attendance: 91, teacher: "Ms. Verma" },
];

export default function TableDemo() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Dynamic Table Component Demo</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A powerful, reusable table component with drag-and-drop column reordering and built-in pagination.
              Try dragging the column headers to reorder them!
            </p>
          </div>

          {/* Tabs for different examples */}
          <Tabs defaultValue="employees" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>

            {/* Employee Data Example */}
            <TabsContent value="employees" className="space-y-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Directory</CardTitle>
                  <CardDescription>
                    Basic configuration with 10 items per page. All columns are visible and draggable.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DynamicTable data={employeeData} itemsPerPage={10} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Employee Directory - Customized</CardTitle>
                  <CardDescription>
                    Custom configuration: 5 items per page, excluding salary and email columns, with custom column labels.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DynamicTable
                    data={employeeData}
                    itemsPerPage={5}
                    excludeColumns={["salary", "email"]}
                    columnLabels={{
                      id: "Employee ID",
                      name: "Full Name",
                      department: "Dept.",
                      position: "Job Title",
                      joining_date: "Date Joined",
                      experience: "Years of Experience",
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Product Data Example */}
            <TabsContent value="products" className="space-y-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Inventory</CardTitle>
                  <CardDescription>
                    Product catalog with 8 items per page and custom column labels.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DynamicTable
                    data={productData}
                    itemsPerPage={8}
                    columnLabels={{
                      product_id: "SKU",
                      product_name: "Product",
                      category: "Category",
                      price: "Price ($)",
                      stock: "In Stock",
                      rating: "Rating (★)",
                      manufacturer: "Brand",
                      warranty_months: "Warranty (Months)",
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Inventory - Minimal View</CardTitle>
                  <CardDescription>
                    Simplified view excluding internal IDs and manufacturer details, 6 items per page.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DynamicTable
                    data={productData}
                    itemsPerPage={6}
                    excludeColumns={["product_id", "manufacturer", "warranty_months"]}
                    columnLabels={{
                      product_name: "Product Name",
                      category: "Category",
                      price: "Price ($)",
                      stock: "Available",
                      rating: "Customer Rating",
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Student Data Example */}
            <TabsContent value="students" className="space-y-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance Records</CardTitle>
                  <CardDescription>
                    Academic records showing student performance with 5 items per page.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DynamicTable
                    data={studentData}
                    itemsPerPage={5}
                    columnLabels={{
                      student_id: "Student ID",
                      name: "Student Name",
                      grade: "Grade Level",
                      subject: "Subject",
                      marks: "Score (%)",
                      attendance: "Attendance (%)",
                      teacher: "Instructor",
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Performance - Summary View</CardTitle>
                  <CardDescription>
                    Compact view excluding teacher information, showing all records (8 items per page).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DynamicTable
                    data={studentData}
                    itemsPerPage={8}
                    excludeColumns={["teacher"]}
                    columnLabels={{
                      student_id: "ID",
                      name: "Name",
                      grade: "Class",
                      subject: "Subject",
                      marks: "Marks",
                      attendance: "Attendance %",
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Usage Instructions */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Basic Usage:</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`import { DynamicTable } from "@/components/DynamicTable";

const data = [
  { id: 1, name: "John", age: 30, city: "NYC" },
  { id: 2, name: "Jane", age: 25, city: "LA" },
];

<DynamicTable data={data} />`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Advanced Configuration:</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`<DynamicTable
  data={employeeData}
  itemsPerPage={10}
  excludeColumns={["salary", "email"]}
  columnLabels={{
    id: "Employee ID",
    name: "Full Name",
    department: "Department"
  }}
/>`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Props:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><code className="text-foreground">data</code>: Array of objects (required) - Your JSON data</li>
                  <li><code className="text-foreground">itemsPerPage</code>: Number (optional, default: 10) - Items to show per page</li>
                  <li><code className="text-foreground">excludeColumns</code>: String array (optional) - Column keys to hide</li>
                  <li><code className="text-foreground">columnLabels</code>: Object (optional) - Custom labels for column headers</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>✅ Drag and drop column reordering</li>
                  <li>✅ Built-in pagination with page numbers</li>
                  <li>✅ Responsive design</li>
                  <li>✅ Automatic column detection from JSON data</li>
                  <li>✅ Custom column labels</li>
                  <li>✅ Column exclusion support</li>
                  <li>✅ Handles nested objects and arrays (converts to JSON string)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
